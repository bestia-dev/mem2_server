//! Learning to code Rust for a http + websocket server on the same port  
//! using Warp for a simple memory game for kids - mem2.
//! On the local public IP address on port 80 listens to http and websocket.
//! Route for http / serves static files from folder /mem2/
//! Route /mem2ws/ broadcast all websocket msg to all connected clients except sender

//region: Clippy
#![warn(
    clippy::all,
    clippy::restriction,
    clippy::pedantic,
    clippy::nursery,
    clippy::cargo,
    //variable shadowing is idiomatic to Rust, but unnatural to me.
    clippy::shadow_reuse,
    clippy::shadow_same,
    clippy::shadow_unrelated,
)]
#![allow(
    //library from dependencies have this clippy warnings. Not my code.
    clippy::cargo_common_metadata,
    clippy::multiple_crate_versions,
    clippy::wildcard_dependencies,
    //Rust is more idiomatic without return statement
    clippy::implicit_return,
    //I have private function inside a function. Self does not work there.
    //clippy::use_self,
    //Cannot add #[inline] to the start function with #[wasm_bindgen(start)]
    //because then wasm-pack build --target no-modules returns an error: export `run` not found 
    //clippy::missing_inline_in_public_items
)]
//endregion

//region: extern and use statements
#[macro_use]
extern crate log;
extern crate env_logger;
extern crate futures;
extern crate regex;
extern crate warp;

use env_logger::Env;
use futures::sync::mpsc;
use futures::{Future, Stream};
use regex::Regex;
use std::collections::HashMap;
use std::net::SocketAddr;
use std::net::{IpAddr, Ipv4Addr, Ipv6Addr};
use std::process::Command;
use std::sync::{
    atomic::{AtomicUsize, Ordering},
    Arc, Mutex,
};
use warp::ws::{Message, WebSocket};
use warp::Filter;
//endregion

//region: enum, structs, const,...
/// Our global unique user id counter.
static NEXT_USER_ID: AtomicUsize = AtomicUsize::new(1);

/// Our state of currently connected users.
/// - Key is their id
/// - Value is a sender of `warp::ws::Message`
type Users = Arc<Mutex<HashMap<usize, mpsc::UnboundedSender<Message>>>>;
//endregion

///main function of the binary
fn main() {
    //region: env_logger log text to stdout depend on ENV variable
    //in Linux : RUST_LOG=info ./mem2_server.exe
    //in Windows I don't know yet.
    //default for env variable info
    let mut builder = env_logger::from_env(Env::default().default_filter_or("info"));
    //nanoseconds in the logger
    builder.default_format_timestamp_nanos(true);
    builder.init();
    //endregion

    //TODO: add cmdline parameter for ip and port
    let local_ip = local_ip_get().expect("cannot get local ip");
    let local_addr = SocketAddr::new(local_ip, 80);

    info!(
        "http server listening on {} and websocket on /mem2ws/",
        local_addr.to_string()
    );

    // Keep track of all connected users, key is usize, value
    // is a websocket sender.
    let users = Arc::new(Mutex::new(HashMap::new()));
    // Turn our "state" into a new Filter...
    //let users = warp::any().map(move || users.clone());
    //Clippy recommands this crazyness instead of clone
    let users = warp::any().map(move || {
        Arc::<
            std::sync::Mutex<
                std::collections::HashMap<
                    usize,
                    futures::sync::mpsc::UnboundedSender<warp::ws::Message>,
                >,
            >,
        >::clone(&users)
    });

    //websocket server
    // GET from route /mem2ws/ -> websocket upgrade
    let websocket = warp::path("mem2ws")
        // The `ws2()` filter will prepare Websocket handshake...
        .and(warp::ws2())
        .and(users)
        .map(|ws: warp::ws::Ws2, users| {
            // This will call our function if the handshake succeeds.
            ws.on_upgrade(move |socket| user_connected(socket, users))
        });

    //static file server
    // GET files of route / -> are from folder /mem2/
    let fileserver = warp::fs::dir("./mem2/");

    let routes = fileserver.or(websocket);
    warp::serve(routes).run(local_addr);
}

//region: websocket callbacks: connect, msg, disconnect
///new user connects
fn user_connected(ws: WebSocket, users: Users) -> impl Future<Item = (), Error = ()> {
    // Use a counter to assign a new unique ID for this user.
    let my_id = NEXT_USER_ID.fetch_add(1, Ordering::Relaxed);

    info!("new websocket user: {}", my_id);

    // Split the socket into a sender and receive of messages.
    let (user_ws_tx, user_ws_rx) = ws.split();

    // Use an unbounded channel to handle buffering and flushing of messages
    // to the websocket...
    let (tx, rx) = mpsc::unbounded();
    warp::spawn(
        rx.map_err(|()| -> warp::Error { unreachable!("unbounded rx never errors") })
            .forward(user_ws_tx)
            .map(|_tx_rx| ())
            .map_err(|ws_err| info!("websocket send error: {}", ws_err)),
    );

    // Save the sender in our list of connected users.
    users.lock().expect("error uses.lock()").insert(my_id, tx);

    // Return a `Future` that is basically a state machine managing
    // this specific user's connection.
    // Make an extra clone to give to our disconnection handler...
    //let users2 = users.clone();
    //Clippy reccomands this crazyness insted of clone()
    let users2 = Arc::<
        std::sync::Mutex<
            std::collections::HashMap<
                usize,
                futures::sync::mpsc::UnboundedSender<warp::ws::Message>,
            >,
        >,
    >::clone(&users);

    user_ws_rx
        // Every time the user sends a message, broadcast it to
        // all other users...
        .for_each(move |msg| {
            user_message(my_id, &msg, &users);
            Ok(())
        })
        // for_each will keep processing as long as the user stays
        // connected. Once they disconnect, then...
        .then(move |result| {
            user_disconnected(my_id, &users2);
            result
        })
        // If at any time, there was a websocket error, log here...
        .map_err(move |e| {
            info!("websocket error(uid={}): {}", my_id, e);
        })
}

///on receive sebsocket message
fn user_message(my_id: usize, messg: &Message, users: &Users) {
    // Skip any non-Text messages...
    let msg = if let Ok(s) = messg.to_str() {
        s
    } else {
        return;
    };

    let new_msg = msg.to_string();
    info!("msg: {}", new_msg);

    // New message from this user, send it to everyone else (except same uid)...
    // We use `retain` instead of a for loop so that we can reap any user that
    // appears to have disconnected.
    for (&uid, tx) in users.lock().expect("error users.lock()").iter() {
        if my_id != uid {
            match tx.unbounded_send(Message::text(new_msg.clone())) {
                Ok(()) => (),
                Err(_disconnected) => {
                    // The tx is disconnected, our `user_disconnected` code
                    // should be happening in another task, nothing more to
                    // do here.
                }
            }
        }
    }
}
///disconnect user
fn user_disconnected(my_id: usize, users: &Users) {
    info!("good bye user: {}", my_id);

    // Stream closed up, so remove from the user list
    users.lock().expect("users.lock").remove(&my_id);
}
//endregion

//region: local ip (linux and windows version)
#[cfg(target_family = "unix")]
///get local ip for unix with ifconfig
pub fn local_ip_get() -> Option<IpAddr> {
    let output = Command::new("ifconfig")
        .output()
        .expect("failed to execute `ifconfig`");

    let stdout = String::from_utf8(output.stdout).unwrap();

    let re = Regex::new(r#"(?m)^.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*$"#).unwrap();
    for cap in re.captures_iter(&stdout) {
        if let Some(host) = cap.at(2) {
            if host != "127.0.0.1" {
                if let Ok(addr) = host.parse::<Ipv4Addr>() {
                    return Some(IpAddr::V4(addr));
                }
                if let Ok(addr) = host.parse::<Ipv6Addr>() {
                    return Some(IpAddr::V6(addr));
                }
            }
        }
    }
    return None;
}

#[cfg(target_family = "windows")]
///get local ip for windows with ipconfig
pub fn local_ip_get() -> Option<IpAddr> {
    let output = Command::new("ipconfig")
        .output()
        .expect("failed to execute `ipconfig`");

    let stdout = String::from_utf8(output.stdout).expect("failed stdout");
    //variables are block scope and will not interfere with the other block
    {
        let re =
            Regex::new(r"(?m)^   IPv4 Address\. \. \. \. \. \. \. \. \. \. \. : ([0-9\.]*)\s*$")
                .expect("failed regex");
        let cap = re.captures(&stdout).expect("failed capture");
        let host = cap.get(1).map_or("", |m| m.as_str());
        if let Ok(addr) = host.parse::<Ipv4Addr>() {
            return Some(IpAddr::V4(addr));
        }
    }
    //variables are block scope and will not interfere with the other block
    {
        let re =
            Regex::new(r"(?m)^   Link-local IPv6 Address \. \. \. \. \. : ([:%a-f0-9\.]*)\s*$")
                .expect("failed regex");
        let cap = re.captures(&stdout).expect("capture");
        let host = cap.get(1).map_or("", |m| m.as_str());
        if let Ok(addr) = host.parse::<Ipv6Addr>() {
            return Some(IpAddr::V6(addr));
        }
    }
    None
}
//endregion

# mem2_server

**Learning to code Rust for a http + WebSocket server on the same port**  
***version: 2.0  date: 2019-04-16 author: [Dev_Bestia](https://bestia.dev) repository: [GitHub](https://github.com/LucianoBestia/mem2_server)***  

using Warp for a simple memory game for kids - mem2.  
  
The Http server is just a simple static file server. All the logic is in Wasm in the browser.  
The browser uses the root route /. The served files are in the folder /mem2/.  
The WebSocket server just broadcasts the received msg to all other connected clients.  
TODO: limit communication only between 2 players. Broadcasting is a an overkill. How to get the WS client id on the client?  
  
You can play the game here (hosted on google cloud platform):  
<https://bestia.dev/mem2>  

The frontend Rust Wasm Dodrio Virtual Dom application code is here:  
<https://github.com/LucianoBestia/mem2>  

## Build and Serve locally

Clone:

```bash
git clone git@github.com:LucianoBestia/mem2_server.git  
```

Run in mem2_server/ folder  

```bash
cargo run  
```

The server will print the External IP Address e.g. 192.168.0.22  
Open your browser and use that address.  
The game is made for exactly 2 players. Open 2 browser windows with the same address.  
Preferably on 2 smartphones on the same WiFi network.  
  
The frontend files are all in the folder mem2/.  
You can replace them eventually with the new version built with wasm-pack from the project `mem2`.  
  
## Memory game rules

This game is for exactly 2 players.  
The first player clicks on "Want to play?" and broadcasts the message over WebSocket.  
Player2 then sees on the screen a "Accept the game" link, clicks it and sends the message to Player1.  
The game starts with a grid of 8 randomly shuffled card pairs face down - 16 cards in all.  
On the screen under the grid are clear signals which player plays and which waits.  
Player1 flips over two cards with two clicks.  
If the cards do not match, the other player clicks on "Take your turn" and both cards are flipped back face down. Then it is his turn and he clicks to flip over his two cards.  
If the cards match, they are left face up permanently and the player receives a point. He continues to play, he opens the next two cards.  

## The adventure never ends

There is so much to learn. That is also the goal of this project.  
How to use warp for static file server and WebSocket on the same port.  
How to route the request to some function (filter).  
How to use #cfg to have different codes for Linux and windows.  
How to start a command and get the output and parse it with regex.  
How to use env_logger to write to the screen and with nanoseconds and colors.  
How to parse cmdline parameters with defaults.

## cargo crev reviews and advisory

It is recommended to always use [cargo-crev](https://github.com/crev-dev/cargo-crev)  
to verify the trustworthiness of each of your dependencies.  
Please, spread this info.  
On the web use this url to read crate reviews. Example:  
<https://web.crev.dev/rust-reviews/crate/num-traits/>  

## References

<https://github.com/seanmonstar/warp>  
<https://docs.rs/env_logger/0.6.0/env_logger/struct.Builder.html>  
<https://github.com/tcr/rust-local-ip>  
<https://regex101.com/>  
<https://docs.rs/env_logger/*/env_logger/>  
<https://docs.rs/regex/1.1.2/regex/struct.Captures.html>  
<https://doc.rust-lang.org/reference/tokens.html#raw-string-literals>  
<https://github.com/clap-rs/clap>  

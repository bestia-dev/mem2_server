Things are changing fast. This is the situation on 2019-04-16. Luciano Bestia  
# mem2_server

Learning to code Rust for a http + websocket server on the same port  
using Warp for a simple memory game for kids - mem2.  
  
The Http server is just a simple static file server. All the logic is in Wasm in the browser.  
The browser uses the root route /. The served files are in the folder /mem2/.  
The Websocket server just broadcasts the received msg to all other connected clients.  
TODO: limit communication only between 2 players. Broadcasting is a an overkill. How to get the ws client id on the client?  
  
You can play the game here:  
https://bestiavm02.southeastasia.cloudapp.azure.com  
Warning: Sometimes the server is down, because I use it for development. But if you contact me, I will be happy to start it.  

The frontend Rust Wasm Dodrio Virtual Dom application code is here:  
https://github.com/LucianoBestia/mem2  
 
## Build and Serve locally
Clone:  
```
git clone git@github.com:LucianoBestia/mem2_server.git  
```
Run in mem2_server/ folder  
```
cargo run  
```
The server will print the External IP Address e.g. 192.168.0.22  
Open your browser and use that address.  
The game is made for exactly 2 players. Open 2 browser windows with the same address.  
Preferably on 2 smartphones on the same wifi network.  
  
The frontend files are all in the folder mem2/.  
You can replace them eventually with the new version built with wasm-pack from the project `mem2`.  
  
# Memory game rules
This game is for exactly 2 players.  
The first player clicks on "Want to play?" and broadcasts the message over websocket.  
Player2 then sees on the screen a "Accept the game" link, clicks it and sends the message to Player1.  
The game starts with a grid of 8 randomly shuffled card pairs face down - 16 cards in all.  
On the screen under the grid are clear signals which player plays and which waits.  
Player1 flips over two cards with two clicks.  
If the cards do not match, the other player clicks on "Take your turn" and both cards are flipped back face down. Then it is his turn and he clicks to flip over his two cards.  
If the cards match, they are left face up permanently and the player receives a point. He continues to play, he opens the next two cards.  

## TODO:
. add milliseconds to Log performance

## References
Rust  
https://github.com/seanmonstar/warp  
https://docs.rs/env_logger/0.6.0/env_logger/struct.Builder.html  
https://github.com/tcr/rust-local-ip  


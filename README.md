Things are changing fast. This is the situation on 2019-04-16. Luciano Bestia
# mem2_server

Learning to code Rust for a http + websocket server on the same port   
using Warp on a simple memory game for kids - second iteration.  
   
Http server is just a simple static file server. The files are in the folder /mem2/.  
Websocket server just broadcast the received msg to all other connected clients.
TODO: limit communication only between 2 players.    
    
You can start the game here:  
 "my azure vm"

The frontend Rust Wasm application code is here:  
https://github.com/LucianoBestia/mem2  
 
## Build and Serve
Run in mem2_server/ folder
```
cargo run
```

Open URI in your browser
http://localhost:3030/  
For 2 players open 2 browser windows.  
Or open it on your 2 smartphones on the same wifi network.  
Change localhost with the IP address of your computer.  
# Memory game rules
The game starts with a grid of 8 randomly shuffled card pairs face down - 16 cards in all.  
The first player flips over two cards with two clicks.  
If the cards do not match, the next player starts his turn with a click to turn both cards back face down. Then two clicks to flip over two cards.  
If the cards match, they are left face up and the player receives a point and continues with the next turn. No additional third click needed in that case.  
This is a programming example for Rust Webassembly Virtual Dom application. 
For the sake of simplicity, it is made as for single player mode. 


## References
Rust  
https://github.com/seanmonstar/warp

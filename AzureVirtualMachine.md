# Virtual machine on internet

I want the game to be played by more people than me and my girlfriend.  
Even if it is just a project in development for learning purposes.  
For that I need a websocket server on the internet.  
I decided to use Azure, because they give one year free account for learning.  
I hope I understood that correctly.  
Most of the big cloud providers have some sort of free trial period.  

## Azure
First I signed up for a free account.  
https://portal.azure.com  
They want to know the credit card number and phone number for verification.  
But they promise they will not charge me untill I explicitly decide to pay.  

## Unintuitive catches
1. Is Azure free account for one month or 12 months?  
2. Will they charge me without my consent?  
3. Cheaper VM is important even for free account.  
4. SSH keys are better then password authentication.  
5. Open 3 ports: 80, 443, 22  
6. Default Public Ip is dynamic. Change it to static or/and give a DNS name.  
7. The VM cannot bind to the Public Ip. Apps must use the VM external ip and Azure infrastructure then makes a 1:1 connection to the public Ip.  

## Virtual machine
On the Azure portal home page I clicked Virtual machine and then Add.  
https://portal.azure.com/#home  
I changed the default recommanded VM type and choose the cheapest option B1s.  
It is a free trial, but for some services I have to pay with a credit they gave me for free - around $200. So I want to spend it the slowest possible. I will also Stop the VM whenever possible.  
I choose the Linux Ubuntu server 18.0  
I don't know why they don't have Debian and I don't know why I like one more than the other. Maybe just historical: what you already know is easier, that unknown.  
They offer 2 Authentication types: password or SSH.  
I can change between then whenever I need with the Reset pasword function in the Portal.  
If I want to use Azure Serial Console from the Portal website I must use password authentication. This works always, even if there are some network problems because it connects over the serial port COM1.  Clever.  
But usually I want to connect over SSH from my local computer. I choose SSH authentication. See instruction for SSH keys below.  
I choose to have this 3 ports opened: http 80, https 443 and SSH 22.  
I finished the VM creation.  
The default Public IP is Dynamic. It changes every time I stop and start the VM. In the Azure Portal I changed it to fixed IP and I choose also a name for the DNS. So I can use now the fancy URL:  
http://bestiavm02.southeastasia.cloudapp.azure.com  

### SSH keys
On my win10 machine I have WSL Windows Subsystem for Linux with Debian. I will use bash to work with SSH keys.  
Created the key:  
`ssh-keygen -t rsa -b 2048 -f ~/.ssh/Luciano`  
Choosen a passphrase.  
2 files are created in a hidden folder `~/.ssh`: the private and the pubic key.  
I need to copy the content of the public key to the Azure portal.  
To show the content of the file with public key:  
`cat ~/.ssh/Luciano.pub`  
I copy the result to clipboard and paste it into the Azure Portal field SSH public key.  
The text should start with "ssh-rsa" and finish with " Luciano" in my case.  

## connection
From my computer in bash I write  
`ssh -i ~/.ssh/Luciano Luciano@bestiavm02.southeastasia.cloudapp.azure.com -v`  
and passphrase and successfully connect to my Azure VM.  

## Linux commands for a non-Linux user
Watchout  - Linux is mostly case sensitive.  
~ is the special sign for "user folder"  
  
How to download files:  
`curl https://github.com/LucianoBestia/blahbla -o ws.exe`  
  
How to copy a folder over SSH:  
`scp -i .ssh/Luciano -r ~/rustprojects/mem2_azure_vm Luciano@bestiavm02.southeastasia.cloudapp.a
zure.com:~/`  
  
How to run a binary with privileges:  
`sudo ~/mem2_azure_vm/mem2_server`  
  
Remove directory not empty:  
`rm -rf mem2`  
  
How to make a file executable. I don't need that now:  
`chmod +x mem2_server`  
  
Create a symlink in WSL to win rustprojects folder  
`ln -s /mnt/c/Users/Luciano/rustprojects ~/rustprojects`  
From Android I use ConnectBot for terminal to Linux VM. I copied the private key and saved the ssh address.  
  
## Rust cross build from Windows to Linux
It is possible to build and run the Linux version from inside Windows.  
But it must be done from WSL Windows Subsystem for Linux bash.  
Go to the mem2_server/ folder.  
First prepare the target:  
`rustup target add x86_64-unknown-linux-gnu`  
Build the application in debug mode:  
`cargo build`  
Run it with:  
`sudo target/debug/mem2_server`  
Warning: `cargo run` will build, but the app will not have permission to listen to ports.  
Warning: The application needs the `ifconfig` command,  
but the Windows Subsystem for Linux does not have it.  
Now it has `ip addr` instead of `ifconfig`. But I still need the old one.  
To install ifconfig write:  
`sudo apt-get install net-tools`  
TODO: found a parser in Rust for `ip addr` https://github.com/mabels/linux-ip-parser/tree/master/rust  
  
For deployment on a true server build the release version for linux:  
`cargo build --release `  

## TODO:
If I start a program and go away and exit my ssh session. Does the program still run?  


Baldr is product build in PermaHack 2023 Hackathon

# Baldr (Beta Vesion)
Baldr is the Public Goods Censorship Resistance Protocol,Censorship resistance is an essential aspect of maintaining freedom of expression and access to information. It ensures that individuals can freely express their opinions and ideas without fear of censorship or suppression. By promoting censorship resistance as a public good, we can protect the fundamental principles of democracy and foster an open and inclusive society.

## Architechture
![alt text](https://raw.githubusercontent.com/conduit-works/baldr/main/img/architecture.png "Architechture")


## Instructions

1. Install Discord Bot : "Still in development"
2. or Join Existing Server : "https://discord.gg/HjMz8Sdz" [Conduit.works Discord]
3. use [Discords Command](https://github.com/conduit-works/baldr/tree/main#discord-commands)
4. visit https://templofbaldr.ar
5. search your username to see blockchain stored conversation



## Discord Commands

- `Etch       `: Store 1 previous message by caller (of caller) 
- `Timeneedle `: Store previous x number of messages in channel (all user)
- `Start      `: Start recording conversation in channel until stop button in clicked


## Techstack
Discord bot : Node js
MEM contract : javascript
Frontend : React js

#Setup and Start command
Discord bot Setup:
1> change wallet.json with actuall arweave wallet
2> add discord bot api key in config.json

Discord bot Start command: 
"node index.js"



## MEM Contract:

tnx_id : v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY

Read state :
curl -X GET "https://api.mem.tech/api/state/v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY"

#Front-end:

npm start



## Plan in action:

Dicord server : https://discord.gg/rpmS2sXX
MEM contract : v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY
Frontend : templofbaldr.ar

## Future scope

Encyption ondata with a key for private discussion

dicord[input key] (encyption) ----> arweave ---->  templofbalr.ar [input] (decryption to show chat)

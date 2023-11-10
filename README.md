Baldr is product build in PermaHack 2023 Hackathon


Website     : https://pc2kmcarscfrqxvfsfafnk4fr6c6jd7nixocj5pd3wszvixlclqq.arweave.net/eLSmCBGQixhepZFAVquFj4Xkj-1F3CT1492lmqLrEuE/ \
\
Frontend design  : https://www.figma.com/file/2fESMm3xP4da4F17ipdnms/Untitled?type=design&node-id=0%3A1&mode=design&t=7CPncCXlzXZNMzMh-1  \
\
MEM Contract : v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY \
\
Pilot Discord Server : https://discord.gg/rpmS2sXX 



## Baldr (Beta Vesion)
Baldr is the Public Goods Censorship Resistance Protocol,Built on Arwearve Blockchain as intermediatry platform between social media and premenanat storage, Censorship resistance is an essential aspect of maintaining freedom of expression and access to information. It ensures that individuals can freely express their opinions and ideas without fear of censorship or suppression. By promoting censorship resistance as a public good, we can protect the fundamental principles of democracy and foster an open and inclusive society.

## Architechture
![alt text](https://raw.githubusercontent.com/conduit-works/baldr/main/img/architecture.png "Architechture")

![alt text2](https://raw.githubusercontent.com/conduit-works/baldr/main/img/view.jpg "view")

## Instructions

1. Join Existing Server : "https://discord.gg/HjMz8Sdz" [Conduit.works Discord]
2. use [Discords Command](https://github.com/conduit-works/baldr/tree/main#discord-commands)
3. visit https://pc2kmcarscfrqxvfsfafnk4fr6c6jd7nixocj5pd3wszvixlclqq.arweave.net/eLSmCBGQixhepZFAVquFj4Xkj-1F3CT1492lmqLrEuE/
4. search your username to see blockchain stored conversation



## Discord Commands

- `/etch       `: Store 1 previous message by caller (of caller) 
- `/timeneedle `: Store previous x number of messages in channel (all user)
- `/start      `: Start recording conversation in channel until stop button in clicked


## Setup and Development Instruction

### Discord bot Setup [/Discord-bot]

1. change `wallet.json` with actual arweave wallet
2. add discord bot `api key` in `config.json`
3. run command inside folder `node index.js`

### MEM Deployment [/mem]

1. mem deploy --src contract.js --init-state state.json
2. mem write --functionId [MEM contract ID] --inputs '{"key":"value"}'
3. curl -X GET "https://api.mem.tech/api/state/:contract_addr"

### Frontend Deployment [/frontend]
1. ...
2. ...
3. ...

## Techstack

| Instrument          | Framework     | Dependency                    |
| ------------------- |:-------------:| -----------------------------:|
| Discord Bot         | Node JS       | arweave-js, discord.js, axios |
| Smart Contract      | Javascript    |                           MEM |
| frontend            | React JS      |                         axios |



## Future scope

- Encyption on data with a key for private discussion
    - discord [input key] (encyption) ----> arweave ---->  templofbalr.ar [input] (decryption to show chat)

- Platform Expansion with forum and social media's (telegram, twitter)

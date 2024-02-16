Baldr began as a submission to permahacks 23 

https://github.com/conduit-works/baldr/assets/37915069/400e6829-37b7-441a-ba3f-3650c47f435b

\
Website     : https://pc2kmcarscfrqxvfsfafnk4fr6c6jd7nixocj5pd3wszvixlclqq.arweave.net/eLSmCBGQixhepZFAVquFj4Xkj-1F3CT1492lmqLrEuE/ \
\
Frontend design  : https://www.figma.com/file/2fESMm3xP4da4F17ipdnms/Untitled?type=design&node-id=0%3A1&mode=design&t=7CPncCXlzXZNMzMh-1  \
\
MEM Contract : v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY \
\
Pilot Discord Server : https://discord.gg/rpmS2sXX 

**Hackathon Submission Video**


https://github.com/conduit-works/baldr/assets/150352117/7704b5e4-a1a5-43bc-b68f-36f1084375b9



## Baldr (Beta Vesion)
Baldr is the Censorship Resistance tool for digital channels of communication and social exchange **(digital public goods)**

**Inspiration**:
In most digital ecosystems, freedom of expression and immutability of that franchise, are rights left to the mercy of an arbitrary centre. it is not that you be beyond reproach in a digital conclave, but simply that the truth of your words, may /etch in eternity- especially if you are doing it at the risk of exile !



 **abstract**:
 
for trust to evolve in digital ecosystems, the immutability of certain human values are fundamental.  there is a social contract between a autonomous agent and a discord server. but if the #discordarchitect breaks that contract, the agent has no refuge, no reproach and eventually no existence. 

**baldr** is a **#discordbot** that records social engagement to **permastore**

## **Architechture**
![alt text](https://raw.githubusercontent.com/conduit-works/baldr/main/img/architecture.png "Architechture")

![alt text2](https://raw.githubusercontent.com/conduit-works/baldr/main/img/view.jpg "view")



## **Instructions**

1. Join Existing Server : "https://discord.gg/HjMz8Sdz" [Conduit.works Discord]
2. use [Discords Command](https://github.com/conduit-works/baldr/tree/main#discord-commands)
3. visit https://pc2kmcarscfrqxvfsfafnk4fr6c6jd7nixocj5pd3wszvixlclqq.arweave.net/eLSmCBGQixhepZFAVquFj4Xkj-1F3CT1492lmqLrEuE/
4. search your username to see blockchain stored conversation



## **Discord Commands**

- `/etch       `: Store 1 previous message by caller 
- `/timeneedle `: Store previous x number of messages in channel (all user)
- `/start      `: Start recording conversation in channel until stop button in clicked


## Setup and Development Instruction

1. `git clone https://github.com/conduit-works/baldr.git`
2. `cd baldr`

### Discord bot Setup [/Discord-bot]
1. `npm install axios`
2. change `wallet.json` with actual arweave wallet
3. add discord bot `api key` in `config.json`
4. run command inside folder `node index.js`

### MEM Deployment [/mem]

1. mem deploy --src contract.js --init-state state.json
2. mem write --functionId [MEM contract ID] --inputs '{"key":"value"}'
3. curl -X GET "https://api.mem.tech/api/state/:contract_addr"

### Frontend Deployment [/frontend]
1. `npm start` inside folder

## Techstack

| Instrument          | Framework     | Dependency                    |
| ------------------- |:-------------:| -----------------------------:|
| Discord Bot         | Node JS       | arweave-js, discord.js, axios |
| Smart Contract      | Javascript    |                           MEM |
| frontend            | React JS      |                         axios |

**Ui Design** (not finished):

![1](https://github.com/conduit-works/baldr/assets/150352117/e5bd9720-1088-4b82-9394-1fb229d844f9)

![2](https://github.com/conduit-works/baldr/assets/150352117/517ed889-8b84-426a-b413-0cfbf97124f0)

![3](https://github.com/conduit-works/baldr/assets/150352117/e941d1f8-0598-4245-bcbc-024c6bb5e7c2)



## Future scope

- Encyption on data with a key for private discussion
    - discord [input key] (encyption) ----> arweave ---->  templofbalr.ar [input] (decryption to show chat)
- Platform Expansion with discourse (forum) and telegram.
- integrations to conduit works

#Discord Commands

Etch : store 1 previous message by caller (of caller)
[image]
Timeneedle : Store previous x number of messages in channel (all user)
[image]
start : start recording conversation in channel until stop button in clicked
[image]


#architechture

discord bot ---> arweave ---> premaweb (templofbaldr.ar)



#techstack
Discord bot : Node js
MEM contract : javascript
Frontend : React js

#Setup and Start command
Discord bot Setup:
1> change wallet.json with actuall arweave wallet
2> add discord bot api key in config.json

Discord bot Start command: 
"node index.js"



#MEM Contract:

tnx_id : v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY

Read state :
curl -X GET "https://api.mem.tech/api/state/v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY"

#Front-end:

npm start



plan in action:

Dicord server : https://discord.gg/rpmS2sXX
MEM contract : v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY
Frontend : templofbaldr.ar

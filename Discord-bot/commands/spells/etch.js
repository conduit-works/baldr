const { SlashCommandBuilder } = require('discord.js');
const Arweave = require("arweave");
const fs = require("fs");
const axios = require('axios');


// arweave store transaction setup

// load the JWK wallet key file from disk
const jwk = JSON.parse(fs.readFileSync('./wallet.json').toString());

// initialize arweave
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

module.exports = {
	data: new SlashCommandBuilder()
		.setName('etch')
		.setDescription('store previous own message message'),
	async execute(interaction) {
	
  const caller_username =interaction.user.username;
  // console.log(caller_username)	
	const messages = await interaction.channel.messages.fetch({ limit: 100 });
  console.log("works here")
    // console.log(interaction.user.username)

    // Filter out messages sent by the caller and convert them to an array
    const callerMessages = messages
      .filter((msg) => msg.author.id === interaction.user.id)
      .values();

    // Get the last message sent by the caller (if available)
    const lastCallerMessage = callerMessages.next().value;

    // end data
    const finalVariable = []
    finalVariable.push({ 'username':lastCallerMessage.author.username,'timestamp':lastCallerMessage.createdTimestamp,'guildID':lastCallerMessage.guildId,'channelID':lastCallerMessage.channelId,'content':lastCallerMessage.content })
    
    // if (lastCallerMessage) {`${lastCallerMessage.author.username}\n${lastCallerMessage.createdTimestamp}\n${lastCallerMessage.guildId}\n${lastCallerMessage.channelId}\n${lastCallerMessage.content}\n\n` 
    //   // Send the last message sent by the caller
    //   interaction.reply(`${lastCallerMessage.author.username}\n${lastCallerMessage.createdTimestamp}\n${lastCallerMessage.guildId}\n${lastCallerMessage.channelId}\n${lastCallerMessage.content}\n\n`);
    // } else {
    //   // No message found
    //   interaction.reply('You have not sent any messages in this channel.');
    // }

    
    // const base64finalVariable= Buffer.from(finalVariable).toString('base64');
    const base64finalVariable= JSON.stringify(finalVariable)
    console.log(typeof(finalVariable))
    console.log(finalVariable)
    console.log(base64finalVariable)

    

    //Arweave Data post
    const tx = await arweave.createTransaction(
      {
        data: base64finalVariable,
      },
      jwk
    );

    tx.addTag('Content-Type', 'text/plain');

    await arweave.transactions.sign(tx, jwk);
    arweave.transactions.post(tx).then(console.log).catch(console.log);
    console.log(`https://arweave.net/${tx.id}`);



    // store tx id on arweave
    const inputs = [{"input": {"function": "store", "username":caller_username,"tnxid":tx.id}}];
    console.log(inputs)
    const functionId = "v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY"

    const req = await axios.post("https://api.mem.tech/api/transactions",
      {
        functionId: functionId,
        inputs: inputs,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const res = req?.data.status
    console.log(req?.data)

    const finalMSG = `content stored in https://arweave.net/${tx.id} ${res}`;
    interaction.reply({content : finalMSG, ephemeral: true});

  }
};

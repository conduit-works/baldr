const { SlashCommandBuilder, Util } = require("discord.js");
const Arweave = require("arweave");
const fs = require("fs");
const axios = require("axios");

// arweave store transaction setup

// load the JWK wallet key file from disk
const jwk = JSON.parse(fs.readFileSync("./wallet.json").toString());

// initialize arweave
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeneedle")
    .setDescription("store previous conversation")
    .addStringOption((option) =>
      option
        .setName("number")
        .setDescription("number of previous messages")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("key").setDescription("Ecryption Key")
    ),
  // .addStringOption(option =>
  //   option.setName('key')
  //     .setDescription('Ecryption Key'));

  async execute(interaction) {
    // input
    const Ekey = interaction.options.getString("key");

    const caller_username = interaction.user.username;

    // return interaction.reply('Pong!');

    // input
    const count = interaction.options.getString("number");
    const intcount = parseInt(count);

    // previous x messages
    const messages = await interaction.channel.messages.fetch({
      limit: intcount,
    });

    // console.log(messages)
    // console.log(typeof(messages))

    // sort and order previous x messages
    const reversedKeys = Object(messages).reverse();

    // persistant store variable
    let loopout = [];

    // print console previous x messages
    for (const item of reversedKeys) {
      // console.log(`${item[1].author.username}\n${item[1].createdTimestamp}\n${item[1].guildId}\n${item[1].channelId}\n${item[1].content}\n`)

      // key based encryption
      let final_msg;
      if (Ekey !== null) {
        const base64 = Buffer.from(item[1].content).toString("base64");
        final_msg = "0-0" + base64 + "+" + Ekey;

        // some_variable is either null or undefined
      } else {
        final_msg = item[1].content;
      }

      loopout.push({
        username: item[1].author.username,
        timestamp: item[1].createdTimestamp,
        guildID: item[1].guildId,
        channelID: item[1].channelId,
        content: final_msg,
      });

      // console.log(item[1].author.username); //username
      // console.log(item[1].createdTimestamp); //timestamp
      // console.log(item[1].guildId); //server
      // console.log(item[1].channelId); //channel
      // console.log(item[1].content); //message
    }

    const finalVariable = JSON.stringify(loopout);
    // const base64finalVariable= Buffer.from(finalVariable).toString('base64');
    const base64finalVariable = finalVariable;
    console.log(typeof finalVariable);
    console.log(finalVariable);
    console.log(base64finalVariable);

    //Arweave Data post
    const tx = await arweave.createTransaction(
      {
        data: base64finalVariable,
      },
      jwk
    );

    tx.addTag("Content-Type", "text/plain");

    await arweave.transactions.sign(tx, jwk);
    arweave.transactions.post(tx).then(console.log).catch(console.log);
    console.log(`https://arweave.net/${tx.id}`);

    // // store tx id on arweave

    const inputs = [
      { input: { function: "store", username: caller_username, tnxid: tx.id } },
    ];
    const functionId = "v_RDVpHFBIDpX1owrBXc59Z1-5O0BmNj8zPNwtNItnY";

    const req = await axios.post(
      "https://api.mem.tech/api/transactions",
      {
        functionId: functionId,
        inputs: inputs,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const res = req?.data.status;

    const finalMSG = `content stored in https://arweave.net/${tx.id} ${res}`;

    try {
      interaction.reply({ content: finalMSG, ephemeral: true });
    } catch (e) {
      try {
        interaction.reply({ content: finalMSG, ephemeral: true });
      } catch (e) {
        console.log("Error replying");
      }
    }
  },
};

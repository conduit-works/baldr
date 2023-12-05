const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const axios = require("axios");
const Arweave = require("arweave");
const fs = require("fs");

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
    .setName("start")
    .setDescription("Start recording messages")
    .addStringOption((option) =>
      option.setName("key").setDescription("Ecryption Key")
    ),

  async execute(interaction) {
    // input
    const Ekey = interaction.options.getString("key");

    const caller_username = interaction.user.username;
    console.log("works here");
    const { user, channel } = interaction;

    // Create a Map to store collected messages
    const messageCollectorMap = new Map();

    // Check if a collector is already running for this channel
    if (messageCollectorMap.has(channel.id)) {
      await interaction.reply(
        "A message collector is already running in this channel."
      );
      return;
    }

    // Create an array to store recorded messages
    const recordedMessages = [];

    // Create a message collector
    const collector = channel.createMessageCollector({ time: 0 });

    // Store the collector in the map
    messageCollectorMap.set(channel.id, collector);

    // Create a button to stop recording
    // const stopButton = new ButtonBuilder()
    // 	.setCustomId('confirm')
    // 	.setLabel('Confirm Ban')
    // 	.setStyle(ButtonStyle.Danger);

    // Respond to the user with the button
    await interaction.reply({
      content:
        "Message recording started. Click the button below to stop recording:",
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              label: "Stop Recording!",
              style: ButtonStyle.Danger,
              custom_id: "stop-recording",
            },
          ],
        },
      ],
      ephemeral: true,
    });

    // Flag to check if recording has been stopped
    let recordingStopped = false;

    // Listen for messages
    collector.on("collect", (message) => {
      // Log the message content to the console
      console.log(
        `${message.author.username}\n${message.createdTimestamp}\n${message.guildId}\n${message.channelId}\n${message.content}\n\n`
      );

      // You can also store the message in the recordedMessages array

      // key based encryption
      let final_msg;
      if (Ekey !== null) {
        const base64 = Buffer.from(message.content).toString("base64");
        final_msg = "0-0" + base64 + "+" + Ekey;

        // some_variable is either null or undefined
      } else {
        final_msg = message.content;
      }

      recordedMessages.push({
        username: message.author.username,
        timestamp: message.createdTimestamp,
        guildID: message.guildId,
        channelID: message.channelId,
        content: final_msg,
      });
    });

    // Listen for the stop button interaction
    const filter = (interaction) =>
      interaction.customId === "stop-recording" &&
      interaction.user.id === user.id;
    const stopButtonCollector = channel.createMessageComponentCollector({
      filter,
      time: 0,
    });

    stopButtonCollector.on("collect", async (button) => {
      button.deferUpdate();
      if (!recordingStopped) {
        // Stop the message collector
        collector.stop();

        // Remove the collector from the map
        messageCollectorMap.delete(channel.id);

        const finalVariable = JSON.stringify(recordedMessages);
        // const base64finalVariable= Buffer.from(finalVariable).toString('base64');
        const base64finalVariable = finalVariable;
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

        // store tx id on arweave
        const inputs = [
          {
            input: {
              function: "store",
              username: caller_username,
              tnxid: tx.id,
            },
          },
        ];
        console.log(inputs);
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
        console.log(req?.data);

        const finalMSG = `content stored in https://arweave.net/${tx.id} ${res}`;

        // Respond to the user with a message
        try {
          interaction.followUp({
            content: `Message recording stopped. ${finalMSG}`,
            ephemeral: true,
          });
        } catch (e) {
          try {
            interaction.followUp({
              content: `Message recording stopped. ${finalMSG}`,
              ephemeral: true,
            });
          } catch (e) {
            console.log("Error replying");
          }
        }

        // Set the flag to true
        recordingStopped = true;
      }
    });

    const finalVariable = recordedMessages;
    collector.on("end", () => {
      console.log(recordedMessages);

      // Collector has ended, you can perform cleanup here if needed
    });
  },
};

// record store on arweave not added yet

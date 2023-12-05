const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const {
  token,
  guildId,
  verification_MessageID,
  verified_RoleID,
  bot_RoleID,
} = require("./config.json");
const { EmbedBuilder } = require("discord.js");
const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
// imported libraries and setuped environmnet varibales

// global variable
let roleName = "";

// creation client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,  
  ],
});



// startup command - will run once, when bot is ready
client.once(Events.ClientReady, async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  await client.user.setActivity("Verify in #verification");
});



// ------------ Slash Comamnds -------------------------

// setting up command functioning
client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }
}

// slash command listner
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

// here is the main function
client.login(token);


// ----------------- verfication message handler -----------------------

// warning message for everyone who joins server


// const disclamer_Embed = new EmbedBuilder()
//   .setColor(0x0099ff)
//   .setTitle("Disclaimer: Blockchain Recording of Messages")
//   .setDescription(
//     "Welcome to our Discord server. Please read the following disclaimer carefully:"
//   )
//   .addFields(
//     {
//       name: "Permanent Record",
//       value:
//         "Messages in this server are automatically recorded and stored on a blockchain.",
//     },
//     {
//       name: "Public Accessibility",
//       value:
//         "Recorded messages may be publicly accessible and used as evidence.",
//     },
//     {
//       name: "Irrevocability",
//       value:
//         "Messages sent here cannot be retracted or deleted from the blockchain.",
//     },
//     {
//       name: "Privacy Notice",
//       value:
//         "Be cautious with your messages. Personal or sensitive information shared here will be permanently recorded and could become public.",
//     },
//     {
//       name: "Adherence to Terms of Service",
//       value: "Your messages must comply with Discord's Terms of Service.",
//     }
//   )
//   .setTimestamp()
//   .setFooter({
//     text: "Your participation in this server implies your understanding and acceptance of these terms. If you do not agree to these conditions, please exit the server.",
//   });

// client.on("guildMemberAdd", (member) => {
//   let channel = client.channels.cache.get("1166034681171554487");
//   channel.send({ embeds: [disclamer_Embed] });
// });

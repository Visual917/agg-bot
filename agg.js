// @ts-nocheck
const fs = require("fs");
const { prefix, token } = require("./config.json");
const { Client, Collection, Intents } = require("discord.js");
const Discord = require("discord.js");
const myIntents = new Intents();

myIntents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MEMBERS,
  Intents.FLAGS.GUILD_BANS,
  Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_PRESENCES,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.DIRECT_MESSAGES,
);
const client = new Client({ intents: myIntents });
const commands = new Collection();

const commandFolders = fs.readdirSync("./commands");

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    commands.set(command.name, command);
  }
}

//2148400320 - permissions

client.login(token);
client.once("ready", () => {
  console.log("!agg Hazır!");
});


client.on("messageCreate", async (message) => {
  /*var removed = false;
  if (message.author.id == "781979085874266132x") {
    yasakliKelimeler = JSON.parse(fs.readFileSync("meta/forbiddenWords.json"));
    yasakliKelimeler.forEach((element) => {
      if (message.content.toLowerCase().includes(element) && !removed) {
        removed = true;
        message.delete();
      }
    });
  }*/
  if (
    !message.content.toLowerCase().startsWith(prefix) &&
    !message.author.bot
  ) {
    return;
  }
  const discordClient = client;
  const discordJS = Discord;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  // @ts-ignore
  const command = args.shift().toLowerCase();

  if (!commands.has(command)) return;
  try {
    commands
      .get(command)
      .execute(message, args, discordClient, discordJS, "command");
  } catch (error) {
    console.error(error);
    const embedSend1 = new Discord.MessageEmbed()
      .setColor("#FF1818")
      .setDescription("<@" + message.author.id + "> 💀 Hata.");
    message.reply({ embeds: [embedSend1] });
  }
});

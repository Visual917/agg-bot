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
  var channel = client.channels.cache.get("1085466895743987712");
  var channel2 = client.channels.cache.get("1085466895743987712");
  const filter = (interaction) => interaction.customId === "accept_rules";
  const collector = channel.createMessageComponentCollector({
    filter,
  });

  // When a user clicks the accept button, assign them the role and send a message confirming it
  collector.on("collect", (interaction) => {
    const user = interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    var roleID = "1084460784777699428";
    const role = interaction.guild.roles.cache.get(roleID);

    if (member.roles.cache.has(roleID)) {
      interaction.reply({
        content: "Kuralları zaten kabul ettiniz.",
        ephemeral: true,
      });
    } else {
      member.roles.add(roleID);
      interaction.reply({
        content:
          "Kuralları kabul ettiniz ve rolünüz verildi. Artık sunucuda bir üyesiniz.",
        ephemeral: true,
      });
    }
  });
  const filter2 = (interaction) =>
    interaction.customId.contains("assign_role_");

  const collector2 = channel2.createMessageComponentCollector({
    filter2,
  });
  const roleIDs = {
    Geliştirici: "1084859945897439422",
    Sanatçı: "1084858236374618192",
    Tasarımcı: "1082673213353492550",
    Öğrenci: "1085460541109174332",
  };
  collector2.on("collect", async (interaction) => {
    const user = interaction.user;
    const member = interaction.guild.members.cache.get(user.id);
    const role = interaction.guild.roles.cache.get(
      roleIDs[interaction.customId.replace("assign_role_", "")],
    );

    if (member.roles.cache.has(role.id)) {
      await interaction.reply({
        content: "Zaten bu role sahipsiniz!",
        ephemeral: true,
      });
    } else {
      // remove all other roles
      for (const [key, value] of Object.entries(roleIDs)) {
        if (member.roles.cache.has(value)) {
          await member.roles.remove(value);
        }
      }
      await member.roles.add(role.id);
      await interaction.reply({
        content: `Başarıyla **${role.name}** rolü verildi!`,
        ephemeral: true,
      });
    }
  });
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

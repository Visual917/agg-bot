module.exports = {
  name: "ping",
  description: "",
  execute(message, args, discordClient, discordJS) {
    // command to show bot's ping
    message.reply("Pong!").then((resultMessage) => {
      const ping = resultMessage.createdTimestamp - message.createdTimestamp;
      resultMessage.edit(
        `Pong! Bot Gecikmesi: ${ping}, API Gecikmesi: ${discordClient.ws.ping}`,
      );
    });
  },
};

const fs = require("fs");

module.exports = {
  name: "say",
  description: "",
  execute(message, args, discordClient, discordJS) {
    /*if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      const embedSend1 = new discordJS.MessageEmbed()
        .setColor("#FF1818")
        .setDescription("<@" + message.author.id + "> ⛔ Yetkin yok.");
      message.reply({ embeds: [embedSend1] });
      return;
    }*/
    if (args.length == 0) {
      const iap = fs.readdirSync("messages", "utf8");
      var messaged = "";
      iap.forEach((file) => {
        messaged = messaged + file + `\n`;
      });
      messaged = messaged.replaceAll(".d", "");
      const embedSend1 = new discordJS.MessageEmbed()
        .setColor("#FF1818")
        .setTitle("⛔ Getirilecek mesajı komuttan sonra gir. Mesaj listesi:")
        .setDescription(messaged)
        .setColor("BLUE");
      message.reply({ embeds: [embedSend1] });
      return;
    }
    if (!fs.existsSync("messages/" + args[0] + ".d")) {
      const embedSend1 = new discordJS.MessageEmbed()
        .setColor("#FF1818")
        .setDescription("<@" + message.author.id + "> ⛔ Mesaj bulunamadı.");
      message.reply({ embeds: [embedSend1] });
      return;
    }
    //message.delete();
    const dir = "messages/" + args[0] + ".d";
    const msj = fs.readFileSync(dir, "utf8");
    const msjFirstLine = msj.split("\n")[0];
    const msjSecondLine = msj.split("\n").slice(1).join("\n");
    const embedSend1 = new discordJS.MessageEmbed()
      .setColor("#FF1818")
      .setTitle(msjFirstLine)
      .setDescription(msjSecondLine)
      .setColor("BLUE")
      .setFooter(message.author.username + " tarafından istendi.");
    message.reply({ embeds: [embedSend1] });
  },
};

module.exports = {
  name: "roller",
  description: "",
  execute(message, args, discordClient, discordJS) {
    if (message.author.id != "897580799593938965") return;
    const roleIDs = {
      Geliştirici: "1084859945897439422",
      Sanatçı: "1084858236374618192",
      Tasarımcı: "1082673213353492550",
      Öğrenci: "1085460541109174332",
    };
    var embedSend = new discordJS.MessageEmbed()
      .setTitle("Rol Al")
      .setDescription("Buradan size en uygun rolü seçebilirsiniz.")
      .setColor("#23FF00"); // you can change the color to match your server's theme
    //message.channel.send({ embeds: [embedSend] });
    // add a button to the embed that says "I agree"
    // when the user clicks the button, the bot will add a role to them
    const row = new discordJS.MessageActionRow();
    Object.entries(roleIDs).forEach(([name, id]) => {
      const button = new discordJS.MessageButton()
        .setCustomId(`assign_role_${name}`)
        .setLabel(name)
        .setStyle("PRIMARY");

      row.addComponents(button);
    });

    // Create a message action row and add the button to it
    // when the user clicks the button, the bot will add a role to them
    message.channel.send({ embeds: [embedSend], components: [row] });
  },
};

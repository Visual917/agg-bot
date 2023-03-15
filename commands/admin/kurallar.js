module.exports = {
  name: "kurallar",
  description: "",
  execute(message, args, discordClient, discordJS) {
    var roleID = "1084460784777699428";
    var embedSend = new discordClient.MessageEmbed()
      .setTitle("Sunucu Kuralları")
      .setDescription(
        "Sunucumuza hoş geldiniz. Aşağıdaki kurallara uymanız gerekmektedir. Kurallara uymayanlar uyarılacak, devamı halinde yasaklanacaktır.",
      )
      .addField(
        "1. Abartılı veya kişiye yönelik hakaret/küfür yasaktır",
        "Huzurlu bir ortam kuralım ve bu ortamı koruyalım.",
      )
      .addField(
        "2. Din, dil, ırk, siyasi tercih veya cinsel yönelimler ile ilgili tartışmaya girmek yasaktır",
        "Birisinin kim veya ne olduğu sadece kendisini ilgilendirir.",
      )
      .addField(
        "3. Kanalları amacı dışında kullanmamaya özen gösterelim",
        "Örneğin bir devlog’da yorum yapacaksanız, kanalı doldurmak yerine genel kanalda devlog sahibini etiketleyebilirsiniz.",
      )
      .addField(
        "4. Yardım isterken sorununuzu açıkça anlatın",
        "Ne yaptığınızı veya ne amaçladığınızı bilmiyorsanız size kimse yardım edemez.",
      )
      .addField(
        "5. Discord’un kullanım koşulları dışında Türkiye Cumhuriyeti kanunlarına da uygun içerikler paylaşmalısınız",
        "En aşırı örnek yaptığınız oyunun cinsel içerik içermesi olabilir. Bu durumda, aşırıya kaçmamaya ve NSFW spoiler tag’i kullanmaya özen gösterin.",
      )
      .setFooter(
        "Yöneticiler uygun bulmadıkları durumlarda mesajlarınızı silme hakkına sahiptir. Buraya öğrenmeye ve paylaşım yapmaya, yeri geldiğinde de eğlenmeye geldiğinizi unutmayın. Olgun davranın. Huzurlu ve ortak bir alan istiyoruz ve bu sunucuda her yaştan insan olduğunu da unutmayın.",
      )
      .setColor("#23FF00"); // you can change the color to match your server's theme
    //message.channel.send({ embeds: [embedSend] });
    // add a button to the embed that says "I agree"
    // when the user clicks the button, the bot will add a role to them
    const acceptButton = new discordClient.MessageButton()
      .setLabel("Kabul Et")
      .setStyle("SUCCESS")
      .setCustomId("accept_rules");

    // Create a message action row and add the button to it
    const row = new discordClient.MessageActionRow().addComponents(
      acceptButton,
    );
    // when the user clicks the button, the bot will add a role to them
    message.channel.send({ embeds: [embedSend], components: [row] });
    const filter = (interaction) => interaction.customId === "accept_rules";
    const collector = channel.createMessageComponentCollector({
      filter,
    });

    // When a user clicks the accept button, assign them the role and send a message confirming it
    collector.on("collect", (interaction) => {
      const user = interaction.user;
      const member = interaction.guild.members.cache.get(user.id);
      const role = interaction.guild.roles.cache.get(roleID);

      if (member.roles.cache.has(roleID)) {
        interaction.reply("Kuralları zaten kabul ettiniz.");
      } else {
        member.roles.add(roleID);
        interaction.reply(
          "Kuralları kabul ettiniz ve rolünüz verildi. Artık sunucuda bir üyesiniz.",
        );
      }
    });
  },
};

module.exports = {
  name: "kurallar",
  description: "",
  execute(message, args, discordClient, discordJS) {
    if (message.author.id != "897580799593938965") return;
    var embedSend = new discordJS.MessageEmbed()
      .setTitle("Sunucu Kuralları")
      .setDescription(
        "Sunucumuza hoş geldiniz. Aşağıdaki kurallara uymanız gerekmektedir. Kurallara uymayanlar uyarılacak, devamı halinde yasaklanacaktır.",
      )
      .addField(
        "1. Abartılı veya kişiye yönelik hakaret/küfür yasaktır",
        "Huzurlu bir ortam kuralım ve bu ortamı koruyalım.",
      )
      .addField("** **", "** **")

      .addField(
        "2. Din, dil, ırk, siyasi tercih veya cinsel yönelimler ile ilgili tartışmaya girmek yasaktır",
        "Birisinin kim veya ne olduğu sadece kendisini ilgilendirir.",
      )
      .addField("** **", "** **")
      .addField(
        "3. Kanalları amacı dışında kullanmamaya özen gösterelim",
        "Örneğin bir devlog’da yorum yapacaksanız, kanalı doldurmak yerine genel kanalda devlog sahibini etiketleyebilirsiniz.",
      )
      .addField("** **", "** **")

      .addField(
        "4. Yardım isterken sorununuzu açıkça anlatın",
        "Ne yaptığınızı veya ne amaçladığınızı bilmiyorsanız size kimse yardım edemez.",
      )
      .addField("** **", "** **")

      .addField(
        "5. Discord’un kullanım koşulları dışında Türkiye Cumhuriyeti kanunlarına da uygun içerikler paylaşmalısınız",
        "En aşırı örnek yaptığınız oyunun cinsel içerik içermesi olabilir. Bu durumda, aşırıya kaçmamaya ve NSFW spoiler tag’i kullanmaya özen gösterin.",
      )
      .addField("** **", "** **")

      .setFooter(
        "Yöneticiler uygun bulmadıkları durumlarda mesajlarınızı silme hakkına sahiptir. Buraya öğrenmeye ve paylaşım yapmaya, yeri geldiğinde de eğlenmeye geldiğinizi unutmayın. Olgun davranın. Huzurlu ve ortak bir alan istiyoruz ve bu sunucuda her yaştan insan olduğunu da unutmayın.",
      )
      .setColor("#23FF00"); // you can change the color to match your server's theme
    //message.channel.send({ embeds: [embedSend] });
    // add a button to the embed that says "I agree"
    // when the user clicks the button, the bot will add a role to them
    const acceptButton = new discordJS.MessageButton()
      .setLabel("Kabul Et")
      .setStyle("SUCCESS")
      .setCustomId("accept_rules");

    // Create a message action row and add the button to it
    const row = new discordJS.MessageActionRow().addComponents(acceptButton);
    // when the user clicks the button, the bot will add a role to them
    message.channel.send({ embeds: [embedSend], components: [row] });
  },
};

module.exports = {
  name: "uptime",
  description: "",
  async execute(message, args, discordClient, discordJS) {
    const messageNo = new discordJS.MessageEmbed()
      .setColor("#338DFF")
      .setDescription(
        "<@" +
          message.author.id +
          "> " +
          `DT Bot şu kadar süredir çevrimiçi: ${await prettyMilliseconds(
            discordClient.uptime,
          )}`,
      );
    message.reply({ embeds: [messageNo] });
  },
};

async function prettyMilliseconds(timestamp) {
  // without modules. only return the values that aren't zero. like 1y 1m 1d 1h 1m 1s
  const ms = timestamp;
  const days = Math.floor(ms / (24 * 60 * 60 * 1000));
  const daysms = ms % (24 * 60 * 60 * 1000);
  const hours = Math.floor(daysms / (60 * 60 * 1000));
  const hoursms = ms % (60 * 60 * 1000);
  const minutes = Math.floor(hoursms / (60 * 1000));
  const minutesms = ms % (60 * 1000);
  const sec = Math.floor(minutesms / 1000);
  let string = "";
  if (days) string += `${days}d `;
  if (hours) string += `${hours}h `;
  if (minutes) string += `${minutes}m `;
  if (sec) string += `${sec}s`;
  return string;
}

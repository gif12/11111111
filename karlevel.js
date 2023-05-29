const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('karlevel')
    .setDescription('تغییر لول کار'),
  async execute(interaction) {
    const user = interaction.user;
    // خواندن پایگاه داده از فایل 'data.json'
    let rawData = fs.readFileSync('./data.json');
    let database = JSON.parse(rawData);

    // پیدا کردن کاربر در پایگاه داده
    const userIndex = database.users.findIndex(userObj => userObj.id === user.id);

    if (userIndex !== -1) {
      const karLevel = database.users[userIndex].kar_level;
      const remainingChoghs = database.users[userIndex].balance;

      if (remainingChoghs < 30000) {
        const errorEmbed = new MessageEmbed()
          .setColor('#FF264F')
          .setDescription('شما به اندازه کافی چوق برای ارتقای لول کارتان ندارید!');

        return interaction.reply({ embeds: [errorEmbed] });
      }

      database.users[userIndex].kar_level = Math.min(karLevel + 1, 10);
      database.users[userIndex].balance = remainingChoghs - 30000;

        // نوشتن تغییرات پایگاه داده در فایل 'data.json'
      fs.writeFileSync('./data.json', JSON.stringify(database));

      const successEmbed = new MessageEmbed()
        .setColor('#09F50E')
        .setDescription(`لول کار شما با موفقیت به ${karLevel + 1} ارتقا یافت.`);

      return interaction.reply({ embeds: [successEmbed] });
    } else {
      const errorEmbed = new MessageEmbed()
        .setColor('#FF264F')
        .setDescription('شما هنوز در رول پلی ثبت نام نکرده اید!');

      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
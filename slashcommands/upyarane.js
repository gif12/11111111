const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('up-yarane')
    .setDescription('ارتقا یارانه'),
  async execute(interaction) {
    const user = interaction.user;

    // خواندن پایگاه داده از فایل 'data.json'
    let rawData = fs.readFileSync('./data.json');
    let database = JSON.parse(rawData);

    // پیدا کردن کاربر در پایگاه داده
    const userIndex = database.users.findIndex(userObj => userObj.id === user.id);

    if (userIndex !== -1) {
      const familySize = database.users[userIndex].yarane;
      const upgradeCost = familySize * 15000;

      if (database.users[userIndex].balance < upgradeCost) {
        const errorEmbed = new MessageEmbed()
          .setColor('#FF264F')
          .setDescription(`شما به اندازه کافی چوق برای ارتقا اعضای خانواده خو دندارید. لطفا ${upgradeCost}  را جمع آوری کنید.`);

        return interaction.reply({ embeds: [errorEmbed] });
      }

      database.users[userIndex].balance -= upgradeCost;
      database.users[userIndex].yarane;

      // نوشتن تغییرات پایگاه داده در فایل 'data.json'
      fs.writeFileSync('./data.json', JSON.stringify(database));

      const successEmbed = new MessageEmbed()
        .setColor('#09F50E')
        .setDescription(`یارانه شما با موفقیت ارتقا یافت. می توانید اکنون ${database.users[userIndex].yarane} چوق یارانه داشته باشید.`);

      return interaction.reply({ embeds: [successEmbed] });
    } else {
      const errorEmbed = new MessageEmbed()
        .setColor('#FF264F')
        .setDescription('شما هنوز در رول پلی ثبت نام نکرده اید!');

      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
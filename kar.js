const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kar')
    .setDescription('نمایش اطلاعات کار'),
  async execute(interaction) {
    const user = interaction.user;

    // خواندن پایگاه داده از فایل 'data.json'
    let rawData = fs.readFileSync('./data.json');
    let database = JSON.parse(rawData);

    // پیدا کردن کاربر در پایگاه داده
    const userIndex = database.users.findIndex(userObj => userObj.id === user.id);

    if (userIndex !== -1) {
      const karName = database.users[userIndex].kar;
      const karLevel = database.users[userIndex].kar_level;
      const daramad = karLevel * 1000 + 10000;
      const yarane = database.users[userIndex].yarane * 2500;
      const totalIncome = daramad + yarane;

      // جمع سازی مقدار totalIncome با مقدار balance در data.json
      database.users[userIndex].balance += totalIncome;

      // نوشتن تغییرات در فایل 'data.json'
      let newData = JSON.stringify(database, null, 4);
      fs.writeFileSync('./data.json', newData, (err) => {
        if (err) throw err;
      });

      const karEmbed = new MessageEmbed()
        .setColor('#7DCEA0')
        .setTitle(`کار: ${karName}`)
        .addFields(
          { name: 'Level :', value: `${karLevel} `, inline: true },
          { name: 'Daramad', value: `${daramad} چوق`, inline: true },
          { name: 'Yarane', value: `${yarane} چوق`, inline: true },
          { name: 'All', value: `${totalIncome} چوق`, inline: true },
        );

      return interaction.reply({ embeds: [karEmbed] });
    } else {
      const errorEmbed = new MessageEmbed()
        .setColor('#FF264F')
        .setDescription('شما هنوز در رول پلی ثبت نام نکرده اید!');

      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
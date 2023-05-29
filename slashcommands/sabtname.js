const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('sabtname')
    .setDescription('ثبت‌نام کاربر جدید'),
  async execute(interaction) {
    const user = interaction.user;

    // خواندن پایگاه داده از فایل `data.json`
    let rawData = fs.readFileSync('./data.json');
    let database = JSON.parse(rawData);

    // پیدا کردن کاربر در پایگاه داده
    const userIndex = database.users.findIndex(userObj => userObj.id === user.id);

    if (userIndex === -1) {
      const newUserObject = { id: user.id, balance: 50000 , kar_level: 1 , yarane: 1 , kar: "کارمند" , cpu: 2 , ram: 1 , disk: 50 , graphic:1};
      database.users.push(newUserObject);

      // نوشتن تغییرات پایگاه داده در فایل `data.json`
      fs.writeFileSync('./data.json', JSON.stringify(database));

      const successEmbed = new MessageEmbed()
        .setColor('#09F50E')
        .setDescription('به رول پلی پیوستید. حساب شما با موفقیت ساخته شد!');

      return interaction.reply({ embeds: [successEmbed] });
    } else {
      const errorEmbed = new MessageEmbed()
        .setColor('#FF264F')
        .setDescription('شما قبلا در رول پلی ثبت نام کرده اید!');

      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
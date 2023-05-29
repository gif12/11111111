const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('chog')
    .setDescription('نمایش موجودی چوق کاربر'),
  async execute(interaction) {
    const user = interaction.user;

    // خواندن پایگاه داده از فایل 'data.json'
    let rawData = fs.readFileSync('./data.json');
    let database = JSON.parse(rawData);

    // پیدا کردن کاربر در پایگاه داده
    const userObject = database.users.find(userObj => userObj.id === user.id);

    if (userObject) {
      const balance = userObject.balance;
      const embed = new MessageEmbed()
        .setColor('#00FF7F')
        .setDescription(`شما موجودی ${balance} چوق دارید.`);

      return interaction.reply({ embeds: [embed] });
    } else {
      const errorEmbed = new MessageEmbed()
        .setColor('#FF264F')
        .setDescription('شما هنوز در رول پلی ثبت نام نکرده اید!');

      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('your_system')
    .setDescription("نمایش سیستم شما"),
  async execute(interaction) {
    const user = interaction.user;

    // خواندن پایگاه داده از فایل 'data.json'
    let rawData = fs.readFileSync('./data.json');
    let database = JSON.parse(rawData);

    // پیدا کردن کاربر در پایگاه داده
    const userObject = database.users.find(userObj => userObj.id === user.id);

    if (userObject) {
      const cpu = userObject.cpu;
      const ram = userObject.ram;
      const disk = userObject.disk;
      const graphic = userObject.graphic;
      const embed = new MessageEmbed()
        .setColor('#00FF7F')
        .setDescription(`\n**__مشخصات سیستم شما :__**\n\n**RAM** : ${ram} GB\n\n**CPU** : ${cpu} core\n\n**Disk** : ${disk} GB\n\n**Graphic** : ${graphic} GB`);

      return interaction.reply({ embeds: [embed] });
    } else {
      const errorEmbed = new MessageEmbed()
        .setColor('#FF264F')
        .setDescription('شما هنوز در رول پلی ثبت نام نکرده اید!');

      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
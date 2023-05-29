const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('karname')
    .setDescription('تغییر نام کار')
    .addStringOption(option =>
      option.setName('name')
        .setDescription('نام جدید کار')
        .setRequired(true)),
  async execute(interaction) {
    const user = interaction.user;
    const karName = interaction.options.getString('name');

    if (!karName) {
      const errorEmbed = new MessageEmbed()
        .setColor('#FF264F')
        .setDescription('نام کار نمی تواند خالی باشد! لطفاً دوباره تلاش کنید.');

      return interaction.reply({ embeds: [errorEmbed] });
    }

    // خواندن پایگاه داده از فایل 'data.json'
    let rawData = fs.readFileSync('./data.json');
    let database = JSON.parse(rawData);

    // پیدا کردن کاربر در پایگاه داده
    const userIndex = database.users.findIndex(userObj => userObj.id === user.id);

    if (userIndex !== -1) {
      // جایگزینی نام کار در فایل 'data.json'
      database.users[userIndex].kar = karName;
      let newData = JSON.stringify(database, null, 4);
      fs.writeFileSync('./data.json', newData, (err) => {
        if (err) throw err;
      });

      const successEmbed = new MessageEmbed()
        .setColor('#09F50E')
        .setDescription(`نام کار شما با موفقیت به **${karName}** تغییر یافت.`);return interaction.reply({ embeds: [successEmbed] });
    } else {
      const errorEmbed = new MessageEmbed()
        .setColor('#FF264F')
        .setDescription('شما هنوز در رول پلی ثبت نام نکرده اید!');

      return interaction.reply({ embeds: [errorEmbed] });
    }
  },
};
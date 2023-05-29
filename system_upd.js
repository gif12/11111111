const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('system-up')
        .setDescription('اطلاعات سیستم را ارتقا دهید'),

    async execute(interaction) {
        const buttonEmbed = new MessageEmbed()
            .setTitle('ارتقاء سیستم')
            .setColor('BLUE')
            .setDescription('برای ارتقاء سیستم خود میتوانید از دکمه های زیر استفاده کنید:');

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('cpu')
                    .setLabel('پردازنده')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('ram')
                    .setLabel('رم')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('disk')
                    .setLabel('دیسک')
                    .setStyle('PRIMARY'),
                new MessageButton()
                    .setCustomId('graph')
                    .setLabel('گرافیک')
                    .setStyle('PRIMARY'),
            );

        // Check if user has registered
        const data = JSON.parse(fs.readFileSync('./data.json'));
        const user = data.users.find(u => u.id === interaction.user.id);
        if (!user) {
            await interaction.reply({ content: 'شما ثبت نام نکرده اید! لطفا از دستور /sabtname استفاده کنید', ephemeral: true });
            return;
        }

        await interaction.reply({ content: 'سیستم شما آماده برای ارتقاء است!', embeds: [buttonEmbed], components: [row] });

        const filter = i => i.customId === 'cpu' || i.customId === 'ram' || i.customId === 'disk' || i.customId === 'graph';

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 60000 });

        collector.on('collect', async i => {
            if (i.customId === 'cpu') {
                const data = JSON.parse(fs.readFileSync('./data.json'));
                const user = data.users.find(u => u.id === interaction.user.id);

                if (user.balance < 40000) {
                    return i.reply({ content: 'شما 40کا برای این عملیات ندارید!', ephemeral: true });
                }

                user.cpu += 2;
                user.balance -= 40000;

                const embed = new MessageEmbed()
                    .setTitle('پردازنده ارتقاء یافت!')
                    .setDescription(`پردازنده شما با موفقیت به یک پردازنده با ${user.cpu} هسته ارتقاء با هزینه 40کا ت`);

                fs.writeFileSync('./data.json', JSON.stringify(data));
                return i.reply({ content: 'تغییرات با موفقیت انجام شد!', embeds: [embed], ephemeral: true });
            } else if (i.customId === 'ram') {
                const data = JSON.parse(fs.readFileSync('./data.json'));
                const user = data.users.find(u => u.id === interaction.user.id);

                if (user.balance < 30000) {
                    return i.reply({ content: 'شما 30کا برای این عملیات ندارید!', ephemeral: true });
                }user.ram += 2;
                user.balance -= 30000;

                const embed = new MessageEmbed()
                    .setTitle('رم ارتقاء یافت!')
                    .setDescription(`رم شما با موفقیت به ${user.ram}GB ارتقا یافت`);

                fs.writeFileSync('./data.json', JSON.stringify(data));
                return i.reply({ content: 'تغییرات با موفقیت انجام شد!', embeds: [embed], ephemeral: true });
            } else if (i.customId === 'disk') {
                const data = JSON.parse(fs.readFileSync('./data.json'));
                const user = data.users.find(u => u.id === interaction.user.id);

                if (user.balance < 25000) {
                    return i.reply({ content: 'شما موجودی 25کا برای این عملیات ندارید!', ephemeral: true });
                }

                user.disk += 50;
                user.balance -= 25000;

                const embed = new MessageEmbed()
                    .setTitle('دیسک ارتقاء یافت!')
                    .setDescription(`دیسک شما با موفقیت به ${user.disk} GB ارتقا یافت`);

                fs.writeFileSync('./data.json', JSON.stringify(data));
                return i.reply({ content: 'تغییرات با موفقیت انجام شد!', embeds: [embed], ephemeral: true });
            } else if (i.customId === 'graph') {
                const data = JSON.parse(fs.readFileSync('./data.json'));
                const user = data.users.find(u => u.id === interaction.user.id);

                if (user.balance < 50000) {
                    return i.reply({ content: 'شما 50کا برای این عملیات ندارید!', ephemeral: true });
                }

                user.graphic += 2;
                user.balance -= 50000;

                const embed = new MessageEmbed()
                    .setTitle('گرافیک ارتقاء یافت!')
                    .setDescription(`گرافیک شما با موفقیت به ${user.graphic} GB ارتقا یافت`);

                fs.writeFileSync('./data.json', JSON.stringify(data));
                return i.reply({ content:'تغییرات با موفقیت انجام شد!', embeds: [embed], ephemeral: true });
            }
        });

    },
}; 
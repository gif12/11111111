const { MessageEmbed } = require('discord.js');

module.exports = {
    data: {
        name: 'system-up',
        description: 'اطلاعات سیستم را ارتقا دهید',
    },
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setTitle('ارتقاء سیستم')
            .setColor('BLUE')
            .setDescription('برای ارتقاء سیستم خود میتوانید از دکمه های زیر استفاده کنید:');

        const row = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setCustomId('cpu')
                    .setLabel('پردازنده')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('ram')
                    .setLabel('رم')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('disk')
                    .setLabel('دیسک')
                    .setStyle('PRIMARY'),
                new Discord.MessageButton()
                    .setCustomId('graph')
                    .setLabel('گرافیک')
                    .setStyle('PRIMARY'),
            );

        // Send the message
        const message = await interaction.reply({ embeds: [embed], components: [row] });

        // Handle button interactions
        const filter = i => i.customId === 'cpu' || i.customId === 'ram' || i.customId === 'disk' || i.customId === 'graph'; // Only listen to button interactions
        const collector = interaction.channel.createMessageComponentCollector({ filter });

        collector.on('collect', async buttonInteraction => {
            const buttonEmbed = new Discord.MessageEmbed()
            	let data = JSON.parse(fs.readFileSync('./data.json'));

                if (buttonInteraction.customId === 'cpu') {
// Check if user has enough balance
                    if (data[interaction.user.id].balance < 40000) {
                        buttonInteraction.reply('شما موجودی کافی برای این عملیات ندارید!', { ephemeral: true });
                        return;
                    }

                    // Upgrade CPU
                    data[interaction.user.id].cpu *= 2;
                    data[interaction.user.id].balance -= 40000;

                    // Send response
                    buttonEmbed.setTitle('پردازنده ارتقاء یافت!');
                    buttonEmbed.setDescription(`پردازنده شما با موفقیت به یک پردازنده با ${data[interaction.user.id].cpu} هسته ارتقا یافت `);
                  
                  // Save changes to data.json file
                  fs.writeFileSync('./data.json', JSON.stringify(data));

                }

                else if (buttonInteraction.customId === 'ram') {
                    // Check if user has enough balance
                    if (data[interaction.user.id].balance < 30000) {
                        buttonInteraction.reply('شما موجودی کافی برای این عملیات ندارید!', { ephemeral: true });
                        return;
                    }

                    // Upgrade RAM
                    data[interaction.user.id].ram *= 2;
                    data[interaction.user.id].balance -= 30000;

                    // Send response
                    buttonEmbed.setTitle('رم ارتقاء یافت!');
                    buttonEmbed.setDescription(`رم شما با موفقیت به ${data[interaction.user.id].ram}GB ارتقا یافت `);
                  
                  // Save changes to data.json file
                  fs.writeFileSync('./data.json', JSON.stringify(data));
                }

                else if (buttonInteraction.customId === 'disk') {
                    // Check if user has enough balance
                    if (data[interaction.user.id].balance < 25000) {
                        buttonInteraction.reply('شما موجودی کافی برای این عملیات ندارید!', { ephemeral: true });
                        return;
                    }

                    // Upgrade Disk
                    data[interaction.user.id].disk += 50;
                    data[interaction.user.id].balance -= 25000;

                    // Send response
                    buttonEmbed.setTitle('دیسک ارتقاء یافت!');
                    buttonEmbed.setDescription(`دیسک شما با موفقیت به ${data[interaction.user.id].disk} GB ارتقا یافت `);

                  // Save changes to data.json file
                  fs.writeFileSync('./data.json', JSON.stringify(data));  
                }

                else if (buttonInteraction.customId === 'graph') {
                    // Check if user has enough balance
                    if (data[interaction.user.id].balance < 50000) {
                        buttonInteraction.reply('شما موجودی کافی برای این عملیات ندارید!', { ephemeral: true });
                        return;
                    }

                    // Upgrade Graphic Card
                    data[interaction.user.id].graphic *= 2;
                    data[interaction.user.id].balance -= 50000;

                    // Send response
                    buttonEmbed.setTitle('گرافیک ارتقاء یافت!');
                    buttonEmbed.setDescription(`گرافیک شما با موفقیت به ${data[interaction.user.id].graphic} GB ارتقا یافت `);

                  // Save changes to data.json file
                  fs.writeFileSync('./data.json', JSON.stringify(data)); 
                }

                buttonInteraction.update({ embeds: [buttonEmbed], components: [row] });
        });
    }
};
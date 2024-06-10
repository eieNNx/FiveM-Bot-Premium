const {ContextMenuCommandBuilder, ApplicationCommandType, EmbedBuilder, PermissionFlagsBits, PermissionsBitField} = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
    .setName("sunucuavatar")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setType(ApplicationCommandType.User),

        run: async (client, interaction, guild) => {

            if (interaction.user.id !== '787095309431341066' && interaction.user.id !== '787095309431341066') {

                const embed = new EmbedBuilder()
                .setAuthor({name: `Hawk Development`,iconURL: `https://i.hizliresim.com/pe0n5c7.jpg`})
                .setFooter({text: `Hawk Development`,iconURL: `https://i.hizliresim.com/pe0n5c7.jpg`})
                .setDescription('**Komutu Kullanmak İçin Yetkin Yok :(**')
                .setTimestamp()
                .setColor('NotQuiteBlack')
                return interaction.reply({embeds: [embed], ephemeral: true})
            }


            const target = await interaction.guild.members.fetch(interaction.targetId)
            var serverIcon = interaction.guild.iconURL({dynamic: true, size: 2048});

            const embed = new EmbedBuilder()

            .setImage(target.user.displayAvatarURL({dynamic: true, size: 2048}))



            const embed2 = new EmbedBuilder()
            .setImage(serverIcon)
        
        await interaction.reply({embeds: [embed2], ephemeral: true})
        
        }
    }

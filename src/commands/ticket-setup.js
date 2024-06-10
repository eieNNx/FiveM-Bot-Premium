const { SlashCommandBuilder,StringSelectMenuBuilder, EmbedBuilder, PermissionFlagsBits, args, slice, ActionRowBuilder } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticketkur")
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .setDescription("Ticket'ı Kurar."),

        run: async (client, interaction, args, message) => {
            let sunucuiconurl = config.sunucuiconurl
            let renk = config.renk
        
            let destekemoji = config.destekemoji
            let donatemoji = config.donatemoji
            let oyuniçisorunemoji = config.oyuniçisorunemoji
            let diğerkategorileremoji = config.diğerkategorileremoji
            let kategorisifirlaemoji = config.kategorisifirlaemoji

            const row = new ActionRowBuilder()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId('select')
                        .setPlaceholder('Ticket Açmak İçin Kategori Seçiniz.')
                        .addOptions([
                            {
                                label: 'Destek, Bug & Teknik Sorunlar',
                                description: 'Destek, Bug veya Teknik Sorun Almak İstiyorsanız.',
                                value: 'general',
                                emoji: `${destekemoji}`
                            },
                            {
                                label: 'Oyun içi Sorunlar & Rol Hataları',
                                description: 'Oyun içi Sorunlar & Rol Hataları',
                                value: 'staff',
                                emoji: `${oyuniçisorunemoji}`
                            },
                            {
                                label: 'Diğer Kategoriler',
                                description: 'Sebebiniz Eğer Burada Yoksa, Bu Kategoride Ticket Açın.',
                                value: 'other',
                                emoji: `${diğerkategorileremoji}`
                            },
                            {
                                label: 'Donate Satın Alım & Sorunlar',
                                description: 'Donate Satın Almak İstiyorsanız veya Sorunuz Varsa Bu Kategoride Ticket Açın.',
                                value: 'donate',
                                emoji: `${diğerkategorileremoji}`
                            },
                            {
                                label: 'Seçenek Sıfırla',
                                description: 'Seçenekleri Sıfırlamanıza Yarar.',
                                value: 'Sıfırla',
                                emoji: `${kategorisifirlaemoji}`
                            },
                            
                        ]),
                );


                const ticket = new EmbedBuilder()
                .setAuthor({ name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
                .setDescription('*Ticket Açmak İçin Aşağıdan Kategori Seçiniz. \n\n __Gereksiz Yere Ticket Açanlara İşlem Uygulanacaktır.__*')
                .setThumbnail(`${sunucuiconurl}`)


            interaction.channel.send({
                embeds: [ticket],
                content: `||@everyone|| **/** ||@here||`,
                components: [row]
            })

            
            

    }
}
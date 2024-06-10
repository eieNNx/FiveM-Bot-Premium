const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const config = require("../config.js");

module.exports = {
       data: new SlashCommandBuilder()
       .setName("dmdestek")
       .setDMPermission(false)
       .setDescription("Kişiye DM'den Mesaj Atarsınız.")
       .addUserOption((option) =>
       option
       .setName("üye")
       .setDescription("Mesaj Atmak İstediğiniz Kişi")
       .setRequired(true)
       ),

        run: async (client, interaction, Guild) => {

            let sunucuiconurl = config.sunucuiconurl
            let sunucubanner = config.sunucubanner
            let renk = config.renk

            const user = interaction.options.getUser("üye");
        const member = await interaction.guild.members.fetch(user.id);

try {
    member.send(`> **${config.sunucuismi} Sunucusunda Destek Odasına Bekleniyorsunuz!**`)
    interaction.reply({
        content: "> **Başarıyla Kişiye Özelden Mesaj Gönderdim.**", ephemeral: true
    })
} catch (error) {
    return interaction.reply({
        content: "> **Mesaj'ı Gönderemedim DM Kapalı.**", ephemeral: true
    }); 
}


    
    },
    
}
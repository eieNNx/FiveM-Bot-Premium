const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, args, slice } = require("discord.js");
const { QuickDB } = require("quick.db");
const { renk } = require("../config.js");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("metin")
        .setDMPermission(false)
        .setDescription("Yazdığınız Mesajı Bot Yazar!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("metin")
                .setDescription("Yazılması İstenen Mesajı Yazınız.")
                .setRequired(true)
        ),





        run: async (client, interaction, args, message) => {
          let renk = config.renk
            let metin = interaction.options.getString("metin");
            if (metin.length < 1) return interaction.reply({ content: "Mesaj Bu Kadar Kısa Olamaz!", ephemeral: true });
            const gonderildi = new EmbedBuilder()
                .setDescription(`**Başarıyla Mesajını Yazdım!**`)
                .setColor(renk);


                interaction.reply({ embeds: [gonderildi], ephemeral: true });
                interaction.channel.send(metin);

            
            

    }
}
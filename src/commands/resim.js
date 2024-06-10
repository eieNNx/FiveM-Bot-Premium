const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, args, slice } = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resim")
        .setDMPermission(false)
        .setDescription("Yazdığınız Resimi Bot Yazar!")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option.setName("resim")
                .setDescription("Yazılması İstenen Resimi Yazınız.")
                .setRequired(true)
        ),





        run: async (client, interaction, args, message) => {    
       
          let renk = config.renk       
            let resim = interaction.options.getString("resim");
            const gonderildi = new EmbedBuilder()
                .setDescription(`**Başarıyla Resimini Yolladım!**`)
                .setColor(renk);


            const anamesaj = new EmbedBuilder()
            .setColor(renk)
            .setImage(`${resim}`);

                interaction.reply({ embeds: [gonderildi], ephemeral: true });
                interaction.channel.send({embeds: [anamesaj]});

            
            

    }
}
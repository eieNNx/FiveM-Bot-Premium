const { SlashCommandBuilder, messageLink, PermissionFlagsBits, User } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { isNull } = require('lodash');
const { QuickDB } = require("quick.db");
const config = require("../config.js");

const db = new QuickDB();
module.exports = {

    data: new SlashCommandBuilder()
    .setName("hexekle")
    .setDMPermission(false)
    .setDescription("Database'e Belirtiğiniz Kişinin Hexini Eklersiniz.")
    .addUserOption((option) =>
    option
    .setName("üye")
    .setDescription("Hex Eklemek İstediğiniz Kişi")
    .setRequired(true)
    ) 
    .addStringOption(option =>
        option
        .setName("steamhex")
        .setDescription("Steam Hex'ini Atınız.")
        .setRequired(true)
        

    ),
    
    run: async (client, interaction) => {
        let yetkiliekibi = config.yetkiliekibi
        let renk = config.renk
      

        const user = interaction.options.getUser("üye");
        const member = await interaction.guild.members.fetch(user.id);
        let steamhex = interaction.options.getString("steamhex");
        const yetkinyok = new EmbedBuilder()
        .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${yetkiliekibi}> Rolün Yok!**`)
        .setColor(renk);

        if(!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

        let hex = await db.get(`hex2.${member.id}`)

        if(hex)
        {
            return interaction.reply(`> **${member} İsimli Kullanıcın Hex'i Yasaklı Hex'te Bulunmakta. Bulunan Hex: ${hex}**`)
        }

        db.set(`hex.${user.id}`,steamhex)

        interaction.reply({ content: `${user} Kişinin Hexini Ekledim! => **${steamhex}**`})
        
    
    }









}
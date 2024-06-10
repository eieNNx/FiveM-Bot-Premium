const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const Discord = require("discord.js"); 
const {MessageActionRow, MessageButton} = require("discord.js")
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("restart")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
    .setDescription("Fivem Restart Mesajı Gönderir!")
    .addStringOption(option =>
        option.setName("saat")
            .setDescription("20:30 Formatında Yazınız.")
            .setRequired(true)
    ),

    run: async (client, interaction) => {

        let sunucuiconurl = config.sunucuiconurl
        let sunucubanner = config.sunucubanner
        let banhammer = config.banhammer
        let renk = config.renk
        let emoji = config.emoji
        let fivemlink = config.fivemlink
        let ts3link = config.ts3link
        let sunucuip = config.sunucuip
        let ts3ip = config.ts3ip


        var serverIcon = interaction.guild.iconURL({dynamic: true});
        const yetkinyok = new EmbedBuilder()
        .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${banhammer}> Rolün Yok!**`)
        .setColor(renk);
  
        if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
        let saat = interaction.options.getString("saat");

      const embed = new EmbedBuilder()
.setColor(renk)
.setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
.setTitle(`> Restart Saati: __${saat}__`)
.setDescription(`\`\`\`Server IP : ${sunucuip}\`\`\``)
.setImage(`${sunucubanner}`)
.setTimestamp()


interaction.reply({content: "**Başarıyla Restart Mesajını Gönderdim!**", ephemeral: true})
interaction.channel.send({ content: "**||@everyone|| & ||@here||**",
embeds: [embed]
});

    }
 };

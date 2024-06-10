const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Events } = require('discord.js');
const Discord = require("discord.js"); 
const config = require("../config.js");
const {MessageActionRow, MessageButton} = require("discord.js")
module.exports = {
    data: new SlashCommandBuilder()
    .setName("bakım")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
    .setDescription("Fivem Bakım Mesajı Gönderir!"),

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


      const yetkinyok = new EmbedBuilder()
      .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${banhammer}> Rolün Yok!**`)
      .setColor(renk);

      if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

      const embed = new EmbedBuilder()
.setColor(renk)
.setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
.setTitle("> Sunucu Bakımda!")
.setDescription(`> **Sunucumuz Şuanda Bakımdadır. Anlayışınız İçin Teşekkür Ederiz!**`)
.setImage(`${sunucubanner}`)
.setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
.setTimestamp()

const row = new ActionRowBuilder()
.addComponents(
new ButtonBuilder()
.setLabel('Sunucuya Bağlan')
.setURL(fivemlink)
.setEmoji(emoji)
.setStyle(ButtonStyle.Link)
,
);



const embed3 = new EmbedBuilder()
.setColor(renk)
.setDescription("> **Başarıyla Bakım Mesajını Gönderdim!**")
.setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
.setTimestamp()

interaction.reply({embeds: [embed3], ephemeral: true})
interaction.channel.send({ content: "**||@everyone|| & ||@here||**",
embeds: [embed]
});

    }
 };

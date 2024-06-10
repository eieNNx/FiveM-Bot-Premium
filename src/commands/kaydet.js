const { SlashCommandBuilder, messageLink, PermissionFlagsBits, EmbedBuilder, PermissionsBitField } = require('discord.js');
const { rename } = require('fs');
const config = require("../config.js");
const Kayit = require('../models/kayit');
const { QuickDB } = require("quick.db");
const db = new QuickDB();
module.exports = {

    data: new SlashCommandBuilder()
    .setName("kaydet")
    .setDMPermission(false)
    .setDescription("Kişiyi Sunucuya Kaydeder.")
    .addUserOption((option) =>
    option
    .setName("üye")
    .setDescription("Sunucuya Kaydetmek İstediğiniz Üye")
    .setRequired(true)
    )
    .addStringOption(option =>
         option
         .setName('steamprofil')
         .setDescription("Steam Profil Linkini Atınız.")
         .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName("steamhex")
        .setDescription("Steam Hex'ini Atınız.")
        .setRequired(true)
        

    ),
    run: async (client, interaction) => {
      
        let sunucuiconurl = config.sunucuiconurl
        let yetkiliekibi = config.yetkiliekibi
        let whitelistedrol = config.whitelistpermi
        let kaydetlogu = config.kayıtlogu
        let renk = config.renk
        let hexroom = config.hexroom
  
        const user = interaction.options.getUser("üye");
        let steamhex = interaction.options.getString("steamhex");
        let steamprofil = interaction.options.getString("steamprofil");
        const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);

        if(member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply(`> **Bir Yöneticiyi Kaydedemem > ${user}**`)



        const yetkinyok = new EmbedBuilder()
        .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${yetkiliekibi}> Rolün Yok!**`)
        .setColor(renk);

        if(!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.roles.cache.get(`1046604548753588274`) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

        const botRole = interaction.guild.members.cache.get(interaction.client.user.id).roles.highest;
            
        if (member.roles.highest.comparePositionTo(botRole) > 0) {

            const embed4 = new EmbedBuilder()
            .setDescription(`> **${user} Adlı Kişiyi Kaydetmeye Yetkim Yetmiyor!**`)
            .setColor(`ffffff`)
            .setAuthor({name: `${interaction.guild.name}`,iconURL: `${sunucuiconurl}`})

            return await interaction.reply({embeds: [embed4], ephemeral: true})
          } 

          let hex = await db.get(`hex2.${member.id}`)

          if(hex)
          {
              return interaction.reply(`> **${member} Adlı Kişiyi Kaydedemem! Kullanıcın Hex'i Yasaklı Hex'te Bulunmakta. Bulunan Hex: ${hex}**`)
          }


        let userID = interaction.member.id
        const puan = 1;

        let kayit = await Kayit.findOne({ userID });
  
        if (!kayit) {
          kayit = new Kayit({ userID, kayits: puan });
        } else {
          kayit.kayits += puan;
        }
  
        await kayit.save();
     
        db.set(`hex.${user.id}`,steamhex)

        const KAYITLI = new EmbedBuilder()

        
        .setColor(renk)
        .setThumbnail(user.avatarURL({ dynamic: true, size: 256 }))
        .setDescription(`**Kişiyi Sunucuya Kaydeden:** ${interaction.member} Yetkilimiz,\n\n **Sunucuya Kaydedilen Kişi: ${user}** \n\n **Steam Hex'i:** ${steamhex} \n\n **Steam Profili:** ${steamprofil} \n\n **__Baktığı Kayıt Sayısı:__** __${kayit.kayits}__`)
        .setThumbnail(`${user.displayAvatarURL()}`)
        .setTimestamp()
        .setFooter({ text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})

        await member.setNickname("IC ISIM / OOC ISIM")
        await member.roles.add(whitelistedrol)
        client.channels.cache.get(hexroom).send(`${user} ${steamhex}`)
        
        interaction.reply(
            { embeds: [KAYITLI], ephemeral: true }
            )
            await client.channels.cache.get(kaydetlogu).send(
                { embeds: [KAYITLI] }
                )
    

    }

    








}
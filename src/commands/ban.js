const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDMPermission(false)
        .setDescription("Kişiyi Sunucudan Banlar..")
        .setDefaultMemberPermissions(PermissionFlagsBits.ChangeNickname)
        .addUserOption(option =>
            option.setName("üye")
                .setDescription("Sunucudan Banlamak İstediğiniz Üye")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("sebep")
                .setDescription("Sunucudan Banlama Sebebini Yazınız.")
                .setRequired(true)
        ),

        run: async (client, interaction) => {


            let sunucuiconurl = config.sunucuiconurl
            let sunucubanner = config.sunucubanner
            let banhammer = config.banhammer
            let renk = config.renk
            let banlogu = config.banlogu
 

        const { channel, options } = interaction;

        const user = options.getUser("üye");
        const reason = options.getString("sebep") || "Sebep Belirtilmedi!";
        try {
        const member = await interaction.guild.members.fetch(user.id);


        if(member.permissions.has(PermissionsBitField.Flags.Administrator)) return await interaction.reply(`> **Bir Yöneticiye Ban Atamazsın, Ban Atılmaya Çalışılan Kişi: ${member}**`)


        const errEmbed = new EmbedBuilder()
            .setDescription(`> **${user} Senden Daha Yüksek Bir Role Sahip veya Benim Yetkim Yetmiyor.**`)
            .setColor(renk);

            const yetkinyok = new EmbedBuilder()
            .setDescription(`> **${interaction.member} Bu Komutu Kullanmak için <@&${banhammer}> Rolün Yok!**`)
            .setColor(renk);
    
            if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });


      const botRole = interaction.guild.members.cache.get(interaction.client.user.id).roles.highest;
      
      if (member.roles.highest.comparePositionTo(botRole) >= 0) {

          const embed88 = new EmbedBuilder()
          .setDescription(`> **${user} Adlı Kişiyi Banlamaya Benim Yetkim Yetmiyor!**`)
          .setColor(`ffffff`)
          .setAuthor({name: `${interaction.guild.name}`,iconURL: `${sunucuiconurl}`})

          return await interaction.reply({embeds: [embed88], ephemeral: true})
        } 


        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        await member.ban({ reason });

        const embed = new EmbedBuilder()
        .setAuthor({name: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})
        .setDescription(`**Sunucudan Banlandı!** ${user} \n\n **Banlayan Kişi:** ${interaction.member} \n\n**Banlanma Sebebi:** ${reason}`)
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setColor(renk)
            .setImage(`https://media.discordapp.net/attachments/1044346249182191639/1054379960418185348/thor-ban.gif?width=574&height=239`)
            .setTimestamp()
            .setFooter({text: `${interaction.guild.name}`, iconURL: `${sunucuiconurl}`})

        await interaction.reply({
            embeds: [embed]
        })
        const banla = new EmbedBuilder()
        .setColor(renk)
        .setThumbnail(user.avatarURL({ dynamic: true, size: 256 }))
        .setDescription(`**Kişiyi Sunucudan Banlayan:**\n ${interaction.member} Yetkilimiz,\n\n **Sunucudan Banlanan Kişi:\n\n** ${user} __${reason}__ Sebeple Sunucudan Banlandı! \n\n Kişinin ID'si: ${user.id}`)
        .setImage(`${sunucubanner}`)
        .setTimestamp()

        await client.channels.cache.get(banlogu).send(
           { embeds: [banla] }
           )
        
        
        }catch (err) {

            const errEmbed2 = new EmbedBuilder()
                .setDescription(`**Kişi Galiba Sunucuda Yok veya Bir Sorun Oluştu!**`)
                .setColor(renk);

            interaction.reply({ embeds: [errEmbed2], ephemeral: true })

            

        }

        


    }
}
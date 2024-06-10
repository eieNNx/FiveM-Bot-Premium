const { SlashCommandBuilder, messageLink, PermissionFlagsBits, GuildMember } = require('discord.js');
const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { rollogu } = require('../config.js');
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("rolver")
    .setDMPermission(false)
    .setDescription("Kişiye Seçtiğiniz Rolü Verir.")
    .addUserOption((option) =>
    option
    .setName("üye")
    .setDescription("Rol Vericeğiniz Kişiyi Seçiniz.")
    .setRequired(true)
    )
    .addRoleOption(option =>
         option
         .setName("rol")
         .setDescription("Vermek İstediğiniz Rolü Seçiniz.")
         .setRequired(true)
    ),
    run: async (client, interaction) => {


        let sunucubanner = config.sunucubanner
        let yetkiliekibi = config.yetkiliekibi
        let renk = config.renk
     

        const user = interaction.options.getUser("üye");
        const rol = interaction.options.getRole("rol")
        const member = await interaction.guild.members
        .fetch(user.id)
        .catch(console.error);


        const rolvar = new EmbedBuilder()
        .setDescription(`**${user} Kişisinde Zaten ${rol} Rolü Mevcut!**`)
        .setColor(renk);
        if(member.roles.cache.has(rol.id)) return interaction.reply({embeds: [rolvar], ephemeral: true})

        const errEmbed = new EmbedBuilder()
        .setDescription(`**${user} Senden Daha Yüksek Bir Role Sahip veya Benim Rolü Vermeye Yetkim Yetmiyor.**`)
        .setColor(renk);


        const bot = interaction.guild.members.cache.get(client.user.id);
        const botrole = bot.roles.highest;

        if (botrole.position <= rol.position) 
        return interaction.reply({ embeds: [errEmbed], ephemeral: true });

        const yetkinyok = new EmbedBuilder()
        .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${yetkiliekibi}> Rolün Yok!**`)
        .setColor(renk);

        const verdim2 = new EmbedBuilder()
        .setDescription(`**Başarıyla ${user} Kişisine ${rol} Rolünü Verdim!**`)
        .setColor(renk);

        if(!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

        member.roles.add(rol.id)


        await interaction.reply({
            embeds: [verdim2]
         });

         const banla = new EmbedBuilder()
         .setColor(renk)
         .setThumbnail(user.avatarURL({ dynamic: true, size: 256 }))
         .setDescription(`**Kişiye Rolü Veren:** ${interaction.member} Yetkilimiz,\n\n **Rol Verilen Kişi:** ${user} __${rol}__ Verildi!`)
         .setImage(`${sunucubanner}`)
         .setTimestamp()

         await client.channels.cache.get(rollogu).send(
            { embeds: [banla] }
            )
     },
};

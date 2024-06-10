const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, PermissionsBitField } = require("discord.js");
const moment = require("moment");
const { QuickDB } = require("quick.db");
const { yetkiliekibi } = require("../config.js");
const config = require("../config.js");

const db = new QuickDB();
module.exports = {
    data: new SlashCommandBuilder()
    .setName("rolbilgi")
    .setDMPermission(false)
    .setDescription("Roldeki Üyelerin Bilgilerini Listeler.")
    .addRoleOption(option =>
      option
      .setName("rol")
      .setDescription("Vermek İstediğiniz Rolü Seçiniz.")
      .setRequired(true)
 ),
    run: async (client, interaction) => {



      let yetkiliekibi = config.yetkiliekibi
      let renk = config.renk
  

      const yetkinyok = new EmbedBuilder()
      .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${yetkiliekibi}> Rolün Yok!**`)
      .setColor(renk);

      if(!interaction.member.roles.cache.get(yetkiliekibi) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });

     
      const rol = interaction.options.getRole("rol")


      let roleDate = moment(rol.createdAt)
      
      let date = `__${roleDate.format(`DD`)} ${roleDate.format(`MM`).replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")} ${roleDate.format(`YYYY`)} Saat ${roleDate.format(`HH:mm`)}__`
           
      try {
							
        let bedrp = `**${rol} Rolüne Sahip Kullanıcıların Bilgileri:** \n **\`Roldeki Kişi Sayısı:\`** ${rol.members.size}\n **\`Rol ID:\`** ${rol.id}\n **\`Rol Oluşturulma Tarihi:\`** ${date}\n\n`;
  interaction.guild.roles.cache.get(rol.id).members.map(r => {
     

    bedrp += r ? `•  <@${r.user.id}> - ${r.user.id} \n ` : ``;
  });

  const bedrpembed = new EmbedBuilder()
    .setColor(renk)
    .setTimestamp()
    .setDescription("" + bedrp + "" )
    interaction.reply({ embeds: [bedrpembed], ephemeral: true });

      } catch (error) {
        const bedrpembed = new EmbedBuilder()
        .setColor(renk)
        .setTimestamp()
        .setDescription("** 100'den Fazla Kullanıcıyı Listeliyemem :(**")
        interaction.reply({ embeds: [bedrpembed], ephemeral: true });
        
      }




    }


}
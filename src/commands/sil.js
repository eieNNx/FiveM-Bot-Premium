const {SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder, PermissionsBitField} = require('discord.js');
const config = require("../config.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mesajsil")
    .setDMPermission(false)
    .setDescription("Kullandığınız Kanalda Belirttiğiniz Sayı Kadar Mesaj Siler.")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addIntegerOption(option =>
        option.setName('sayı')
        .setDescription('Seçtiğin Sayı Kadar Siler.')
        .setRequired(true)
        )
    .addUserOption(option =>
        option.setName('kişi')
        .setDescription('Seçtiğiniz Kişinin Belirttiğiniz Sayı Kadar Mesajını Siler.')
        .setRequired(false)
        ),

        run: async (client, interaction) => {

            let banhammer = config.banhammer
            let renk = config.renk
        

            const yetkinyok = new EmbedBuilder()
      .setDescription(`**${interaction.member} Bu Komutu Kullanmak için <@&${banhammer}> Rolün Yok!**`)
      .setColor(renk);

      if(!interaction.member.roles.cache.get(banhammer) && !interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ embeds: [yetkinyok], ephemeral: true });
      
        const {channel, options} = interaction;

        const amount = options.getInteger('sayı');
        const target = options.getUser("kişi");

        if (amount < 1 || amount > 50) {
            return interaction.reply({ content: '> **Hatalı Miktar. En Az __1 Adet__, En Fazla __50 Adet__ Mesaj Silebilirsiniz.**', ephemeral: true });
          }

        const messages = await channel.messages.fetch({
            limit: amount +1,
        });

        const res = new EmbedBuilder()
            .setColor(renk)

        if(target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) =>{
                if(msg.author.id === target.id && amount > i) {
                    filtered.push(msg);
                    i++;
                }
            });

            await channel.bulkDelete(filtered).then(messages => {
                res.setDescription(`**Başarıyla ${target} Kullanıcısının Attığı ${messages.size} Mesajı  Sildim.**`);
                interaction.reply({embeds: [res]}); // you can use ephemeral if you desire
            });
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setDescription(`**Başarıyla ${messages.size} Kadar Mesajı Kanaldan Sildim!**`);
                interaction.reply({embeds: [res]});
            });
        }
    }
}
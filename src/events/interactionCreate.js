const { EmbedBuilder, InteractionType, ChannelType, ContextMenuCommandBuilder, ApplicationCommandType } = require("discord.js");
const { readdirSync } = require("fs");

const config = require('../config.js')

 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
  let client = interaction.client;
   if (interaction.type == InteractionType.ApplicationCommand) {
   if(interaction.user.bot) return;

if(!interaction) return interaction.reply(`**eieNN'e Söyle Bir Sorun Oluştu!**`)

   if (interaction.channel.type === 1) {

    return interaction.reply({
      embeds: [new Discord.EmbedBuilder()
        .setAuthor({name: `${config.sunucuismi}`, iconURL: `${config.sunucuiconurl}` })
        .setColor(`${config.renk}`)
        .setDescription(`> **Slash Komutlarımı DM Üzerinden Kullanamazsın :)**`)
        .setTimestamp()
        .setFooter({text: `${config.sunucuismi}`, iconURL: `${config.sunucuiconurl}` })

      ],
      ephemeral: true
    })
  }


	readdirSync('./src/commands').forEach(file => {
        const command = require(`../../src/commands/${file}`);
        if(interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
        command.run(client, interaction)
    }
	})
}
  }}

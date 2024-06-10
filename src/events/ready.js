const { ActivityType, Client } = require("discord.js")
const config = require('../config.js')
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setPresence({
			activities: [{ name: `${config.sunucuismi}`, type: ActivityType.Playing }],
			status: 'idle',
		  });
}};

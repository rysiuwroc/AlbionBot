const { prefix } = require("../../config.json");

module.exports = {
	name: "echo",
	description: "ping with echo arg",
	args: "true",
	usage: "<user>",
	cooldown: 5,
	guildOnly: false,
	aliases: [],
	async execute(message, args) {
		await message.channel.send(`Pong. ${args[0]}`);
	},
};

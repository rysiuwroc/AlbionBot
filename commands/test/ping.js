module.exports = {
	name: "ping",
	description: "Ping!",
	args: "false",
	usage: "",
	cooldown: 5,
	guildOnly: false,
	aliases: [],
	async execute(message, args) {
		await message.channel.send("Pong.");
	},
};

const findPlayer = require("../../functions/albion_api/player/find-player");

module.exports = {
	name: "player",
	description: "player",
	args: "true",
	usage: "<user>",
	cooldown: 0,
	guildOnly: false,
	aliases: ["p", "pl"],
	async execute(message, args) {
		let reply = await message.channel.send(`Looking for: ${args[0]}`);
		let response = await findPlayer.execute(`${args[0]}`);
			//if response is OK
			if (response.status == 200) {
				//check if players found
				if (response.data.players.length == 0) {
					return reply.edit(`There is no player named: **${args[0]}**.`);
				}
				//check if player has a guild
				if (response.data.players[0].GuildName == "") {
					return reply.edit(`Player **${args[0]}** has no guild.`);
				}
				//main return
				return reply.edit(`The Guild of **${args[0]}** is: **${response.data.players[0].GuildName}**.`);
			}
			//error return
			return reply.edit(`There was an error while processing your request.`);

		
	}
};

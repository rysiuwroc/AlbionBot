const albionApi = require("../../functions/albion-api");
const endpoints = require("../../../configs/albion-api-config.json");
const Player = require("../../classes/player");

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
		let response = await albionApi.execute(endpoints.findPlayerByName, args[0]);
			//if response is OK
			if (response.status == 200) {
				//check if players found
				if (response.data.players.length == 0 || response.data.players[0].Name.toLowerCase()!=args[0].toLowerCase()) {
					return reply.edit(`There is no player named: **${args[0]}**.`);
				}

				//main return
				var player = new Player(await albionApi.execute(endpoints.getPlayerById,response.data.players[0].Id))
				await player.fetchRealAllianceData();
				return reply.edit(JSON.stringify(player,null,4));
			}
			//error return
			return reply.edit(`There was an error while processing your request.`);

		
	}
};

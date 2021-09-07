const axios = require("axios");

module.exports = {
	name: "player",
	description: "player",
	args: "true",
	usage: "<user>",
	cooldown: 5,
	guildOnly: false,
	aliases: ["p", "pl"],
	execute(message, args) {
		let reply = message.channel.send(`Looking for: ${args[0]}`);
		axios.get(`https://gameinfo.albiononline.com/api/gameinfo/search?q=${args[0]}`).then((response) => {
			reply.then(function (result) {
				if (response.status==200){
                    if (response.data.players.length==0){
                        return result.edit(`There is no player named: **${args[0]}**.`);
                    }
                    if (response.data.players[0].GuildName==""){
                        return result.edit(`Player **${args[0]}** has no guild.`);
                    }
                    return result.edit(`The Guild of **${args[0]}** is: **${response.data.players[0].GuildName}**.`);
                }
				return result.edit(`There was an error while processing your request.`);
			});
		});
	},
};

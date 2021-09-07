const { prefix } = require("../config.json");
const Discord = require("discord.js");

module.exports = {
	name: "message",
	execute(client, message) {
		//log+look for prefix
		console.log(`${message.author.tag} in #${message.channel.name} sent: ${message.content}`);
		if (!message.content.startsWith(prefix) || message.author.bot) return;

		//check args and get command/alias
		const args = message.content.slice(prefix.length).trim().split(/ +/);
		const commandName = args.shift().toLowerCase();
		const command = client.commands.get(commandName) || client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

		//check if the command exists
		if (!client.commands.has(command.name)) return;

		try {
			//validate args count
			if (command.args && !args.length) {
				let reply = `You didn't provide any arguments, ${message.author}!`;
				//add usage to reply if possible
				if (command.usage) {
					reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
				}

				return message.channel.send(reply);
			} else {
				//spamming check
				if (!client.cooldowns.has(command.name)) {
					client.cooldowns.set(command.name, new Discord.Collection());
				}

				const now = Date.now();
				const timestamps = client.cooldowns.get(command.name);
				const cooldownAmount = (command.cooldown || 3) * 1000;

				if (timestamps.has(message.author.id)) {
					const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

					if (now < expirationTime) {
						const timeLeft = (expirationTime - now) / 1000;
						return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${prefix}${commandName}\` command.`);
					}
				}

				timestamps.set(message.author.id, now);
				setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

				//request execution
				client.commands.get(command.name).execute(message, args);
			}
		} catch (error) {
			console.error(error);
			message.reply("There was an error trying to execute that command!");
		}
	},
};

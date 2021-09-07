const fs = require("fs");
const Discord = require("discord.js");
const { prefix, token } = require("./configs/discord-config.json");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const commandFolders = fs.readdirSync("./libs/commands");

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./libs/commands/${folder}`).filter((file) => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`./libs/commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

const eventFiles = fs.readdirSync("./libs/events").filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
	const event = require(`./libs/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	} else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

client.login(token);

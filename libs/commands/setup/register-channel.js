const dbGetByPk = require("../../functions/db/db-get-by-pk");
const discoGuildUpdate = require("../../functions/db/disco-guild-update");

module.exports = {
    name: "sregisterhannel",
    description: "Select register channel for players to use \`!register\`.",
    args: false,
    usage: "<#mention_channel>",
    cooldown: 0,
    guildOnly: true,
    aliases: ["src"],
    adminChannel: false,
    async execute(message, args) {
        if (!args[0]) {
            var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id)
            discoGuild.registerChannelId = null;
            await discoGuildUpdate.execute(discoGuild);
            return message.reply("Register channel deleted");
        }
        try {
            var channelId = message.mentions.channels.first().id
        }
        catch {
            return message.reply("Wrong attributes, type \`!help sRegisterChannel\` for help");
        }

        var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id)
        discoGuild.registerChannelId = channelId;
        await discoGuildUpdate.execute(discoGuild);
        message.reply(`Register channel set to <#${channelId}>`);
    }
}
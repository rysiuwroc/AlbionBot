const dbGetByPk = require("../../functions/db/db-get-by-pk");
const discoGuildUpdate = require("../../functions/db/disco-guild-update");

module.exports = {
    name: "sadminchannel",
    description: "Select admin channel for settings and bot news/changelogs.",
    args: false,
    usage: "<#mention_channel>",
    cooldown: 0,
    guildOnly: true,
    aliases: ["sac"],
    adminChannel: false,
    async execute(message, args) {
        if (!args[0]) {
            var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id)
            discoGuild.adminChannelId = null;
            await discoGuildUpdate.execute(discoGuild);
            return message.reply("Admin channel deleted");
        }
        try {
            var channelId = message.mentions.channels.first().id
        }
        catch {
            return message.reply("Wrong attributes, type \`!help sAdminChannel\` for help");
        }

        var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id)
        discoGuild.adminChannelId = channelId;
        await discoGuildUpdate.execute(discoGuild);
        message.reply(`Admin channel set to <#${channelId}>`);
    }
}
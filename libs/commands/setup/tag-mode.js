const dbGetByPk = require("../../functions/db/db-get-by-pk");
const discoGuildUpdate = require("../../functions/db/disco-guild-update");

module.exports = {
    name: "stagmode",
    description: "Set player tag mode:\n\`1 - Tags on\`\n2 - Tags off\`",
    args: true,
    usage: "<1,2>",
    cooldown: 0,
    guildOnly: true,
    aliases: ["stt"],
    adminChannel: true,
    async execute(message, args) {
        if (args[0] == 1 || args[0] == 2) {
            var result= await dbGetByPk.execute("settings_tagmode_statuses",args[0]);

            var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id);
            discoGuild.tagModeStatusId = args[0];
            await discoGuildUpdate.execute(discoGuild);
            message.reply(`Tag mode set to \`${args[0]} - ${result.description}\``);
        }
        else {
            message.reply("Wrong attributes, type \`!help sTagMode\` for help");
        }
    }
}
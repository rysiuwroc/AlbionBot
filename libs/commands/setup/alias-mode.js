const dbGetByPk = require("../../functions/db/db-get-by-pk");
const discoGuildUpdate = require("../../functions/db/disco-guild-update");

module.exports = {
    name: "saliasmode",
    description: "Set player alias mode:\n**1** - Use IGN \n**2** - Use Discord name",
    args: true,
    usage: "<1,2>",
    cooldown: 0,
    guildOnly: true,
    aliases: ["sam"],
    adminChannel: true,
    async execute(message, args) {
        if (args[0] == 1 || args[0] == 2) {
            var result= await dbGetByPk.execute("settings_aliasmode_statuses",args[0]);

            var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id);
            discoGuild.aliasModeStatusId = args[0];
            await discoGuildUpdate.execute(discoGuild);
            message.reply(`Alias mode set to \`${args[0]} - ${result.description}\``);
        }
        else {
            message.reply("Wrong attributes, type \`!help sAliasMode\` for help");
        }
    }
}
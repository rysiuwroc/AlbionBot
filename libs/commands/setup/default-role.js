const dbGetByPk = require("../../functions/db/db-get-by-pk");
const discoGuildUpdate = require("../../functions/db/disco-guild-update");

module.exports = {
    name: "sdefaultrole",
    description: "Set default role when player succesfuly uses **!register <IGN>**",
    args: true,
    usage: "<@role_mention>",
    cooldown: 0,
    guildOnly: true,
    aliases: ["sdr"],
    adminChannel: true,
    async execute(message, args) {
        try{
            var roleId = message.mentions.roles.first().id
        }
        catch{
            return message.reply("Wrong attributes, type \`!help sDefaultRole\` for help");
        }
            var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id);
            discoGuild.defaultRoleId = roleId;
            await discoGuildUpdate.execute(discoGuild);
            return message.reply(`Default role set to <@&${roleId}>`);
    }
}
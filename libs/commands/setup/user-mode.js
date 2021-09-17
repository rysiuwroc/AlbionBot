const dbGetByPk = require("../../functions/db/db-get-by-pk");
const discoGuildUpdate = require("../../functions/db/disco-guild-update");

module.exports = {
    name: "susermode",
    description: "Set which players can register on your server:\n\`1 - Guild only\`\n\`2 - Alliance only\`\n\`3 - Everyone (dangerous for bigger servers)\`",
    args: true,
    usage: "<1,2,3>",
    cooldown: 0,
    guildOnly: true,
    aliases: ["sum"],
    adminChannel: true,
    async execute(message, args) {
        if(args[0]==1 ||args[0]==2 || args[0]==3){
            var result= await dbGetByPk.execute("settings_usermode_statuses",args[0]);

            var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id)
            discoGuild.allowUsersStatusId=args[0];
            await discoGuildUpdate.execute(discoGuild);
            message.reply(`User mode set to \`${args[0]} - ${result.description}\``);
        }        
        else{
            message.reply("Wrong attributes, type \`!help sUserMode\` for help");
        }
    }
}
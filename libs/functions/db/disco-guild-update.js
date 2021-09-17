const db = require("../../../models/index")

module.exports = {
    async execute(guild) {
            await db["disco_guilds"].update({
                id: guild.id,
                guildName: guild.name,
                albionGuildId:guild.albionGuildId,
                albionAllianceId:guild.albionAllianceId,
                adminChannelId:guild.adminChannelId,
                defaultRoleId:guild.defaultRoleId,
                allowUsersStatusId:guild.allowUsersStatusId,
                tagUseStatusId:guild.tagUseStatusId,
                tagModeStatusId:guild.tagModeStatusId,
                joinedAt: guild.joinedAt,               
            },{where:{id:guild.id}})
        
    },
}
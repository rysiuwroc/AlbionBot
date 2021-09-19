const db = require("../../../models/index")

module.exports = {
    async execute(player) {
        var result = await db["albion_players"].findAndCountAll({ where: { id: player.id } });
        if (!result.count) {
            return await db["albion_players"].create({
                id: player.id,
                name: player.name,
                guildId:player.guildId,
                allianceId:player.allianceId,
                isActive:player.isActive,
                flastChecked:player.lastChecked
            })
        }
    },
}
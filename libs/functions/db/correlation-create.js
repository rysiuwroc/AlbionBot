const db = require("../../../models/index")

module.exports = {
    async execute(userId,discoGuildId,playerId,guildId) {
            return await db["correlation_user_player_discoguild"].create({
                userId: userId,
                guildId:guildId,
                playerId:playerId,
                discoGuildId:discoGuildId
            })
        },
    }

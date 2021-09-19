const db = require("../../../models/index")


module.exports = {
    async execute(playerId, discoGuildId) {
        return await db[model].findOne({
            where: {
                playerId: playerId,
                discoGuildId: discoGuildId
            }
        });
    }
}
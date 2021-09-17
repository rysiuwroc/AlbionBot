const db = require("../../../models/index")

module.exports = {
    async execute(guild) {
        var result = await db["albion_guilds"].findAndCountAll({ where: { id: guild.id } });
        if (!result.count) {
            await db["albion_guilds"].create({
                id: guild.id,
                name: guild.name,
                allianceId:guild.allianceId,
                founderId:guild.founderId,
                foundationDate:guild.foundedDate
            })
        }
    },
}
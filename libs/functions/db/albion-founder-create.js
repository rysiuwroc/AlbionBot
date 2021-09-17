const db = require("../../../models/index")

module.exports = {
    async execute(guild) {
        var result = await db["albion_founders"].findAndCountAll({ where: { id: guild.founderId } });
        if (!result.count) {
            await db["albion_founders"].create({
                id: guild.founderId,
                name: guild.founderName
            })
        }
    },
}
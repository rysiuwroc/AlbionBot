const db = require("../../../models/index")

module.exports = {
    async execute(alliance) {
        var result = await db["albion_alliances"].findAndCountAll({ where: { id: alliance.id } });
        if (!result.count) {
            await db["albion_alliances"].create({
                id: alliance.id,
                name: alliance.name,
                tag: alliance.tag,
                founderId: alliance.founderId,
                foundationDate:alliance.foundedDate
            })
        }
    },
}
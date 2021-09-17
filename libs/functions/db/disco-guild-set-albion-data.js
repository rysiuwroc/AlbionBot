//TODO WOIP
const db = require("../../../models/index")

module.exports = {
    async execute(guild) {
        //checking if the guild is in the db, if not then add
        var result = await db["disco_guilds"].findAndCountAll({ where: { id: guild.id } });
        if (!result.count) {
            await db["disco_guilds"].create({
                id: guild.id,
                guildName: guild.name,
                joinedAt: guild.joinedAt
            })
        }
    },
}
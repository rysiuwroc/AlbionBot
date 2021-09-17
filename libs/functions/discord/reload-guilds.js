const db = require("../../../models/index");
const discoGuildCreate = require("../db/disco-guild-create");

module.exports = {
    async execute(client) {
        await Promise.all(client.guilds.cache.map(async (guild) => {
            await discoGuildCreate.execute(guild);
        }));
        console.log(`Server reloading finished!`)
    }
}
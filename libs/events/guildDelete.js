const db = require("../../models/index")
const discoGuildDelete = require("../functions/db/disco-guild-delete")

module.exports={
    name:"guildDelete",
    async execute(client,guild){
        await discoGuildDelete.execute(guild);
    },
}
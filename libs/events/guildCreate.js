const db = require("../../models/index");
const albionApi = require("../functions/albion-api");
const discoGuildCreate=require("../functions/db/disco-guild-create")
const endpoint=require("../../configs/albion-api-config.json")

module.exports={
    name:"guildCreate",
    async execute(client,guild){
    await discoGuildCreate.execute(guild);
        }
    }

const db = require("../../models/index")

module.exports={
    name:"guildDelete",
    async execute(client,guild){
        //checking if the guild is in the db, if yes then remove
        //TODO: need to check foreign keys and delete from different tables
        var result =await db["disco_guilds"].findAll({where:{id:guild.id}});
        if(!result.lenght){
            await db["disco_guilds"].destroy({where:{id:guild.id}})
        }
    },
}
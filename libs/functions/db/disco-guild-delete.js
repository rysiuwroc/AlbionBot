const db = require("../../../models/index")

module.exports={
    async execute(guild){
        //checking if the guild is in the db, if yes then remove
        //TODO: need to check foreign keys and delete from different tables
        if(!await db["disco_guilds"].findAll({where:{id:guild.id}}).lenght){
            await db["disco_guilds"].destroy({where:{id:guild.id}})
        }
    },
}
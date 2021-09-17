const db = require("../../../models/index")


module.exports={async execute(model,column,value){
    return await db[model].findOne({where:{[column]:value}});
    }
}
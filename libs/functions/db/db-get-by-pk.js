const db = require("../../../models/index")


module.exports={async execute(model,pk){
    return await db[model].findByPk(pk);
    }
}
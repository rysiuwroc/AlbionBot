const db = require("../../../models/index")

module.exports = {
    async execute(userId,userName) {
        //checking if the guild is in the db, if not then add
        var result = await db["disco_user"].findAndCountAll({ where: { id: playerId } });
        if (!result.count) {
            return await db["disco_user"].create({
                id: userId,
                usernameTag: userName
            })
        }
    },
}
const dbGetByPk = require("../db/db-get-by-pk")


module.exports = {
    execute(correlation, oldName) {
        var player = await dbGetByPk.execute("albion_players", correlation.playerId);
        var guild = await dbGetByPk.execute("albion_guilds", player.guildId);
        var playerName;

        if (oldName){
            playerName=oldName;
        }
        else{
            playerName=player.name;
        }

        if (!guild) {
            return `[NONE] ${playerName}`;
        }
        if (guild.customTag) {
            return `[${guild.customTag}] ${playerName}`;

        }
        return `[${guild.name.substring(0, 3)}] ${playerName}`;
    }
}
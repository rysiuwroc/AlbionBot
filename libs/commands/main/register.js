const Player = require("../../classes/player");
const albionApi = require("../../functions/albion-api");
const dbGetByColumnValue = require("../../functions/db/db-get-by-column-value");
const dbGetByPk = require("../../functions/db/db-get-by-pk");
const endpoints = require("../../../configs/albion-api-config.json");
const correlationUserPlayerDiscoguildGet = require("../../functions/db/correlation-user-player-discoguild-get");

module.exports = {
    name: "register",
    description: "",
    args: true,
    usage: "<IGN>",
    cooldown: 360,
    guildOnly: true,
    aliases: [],
    async execute(message, args) {
        var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id);

        if (message.channel.id != discoGuild.registerChannelId) {
            return;
        }
        var player = await dbGetByColumnValue.execute("albion_players", "name", args[0]);
        
        //get player from albion api if not found in db
        if (!player) {
            let response = await albionApi.execute(endpoints.findPlayerByName, args[0]);
            //if response is OK
            if (response.status == 200) {
                //if player is found and correct
                if (response.data.players.length == 0 || response.data.players[0].Name.toLowerCase() != args[0].toLowerCase()) {
                    embed.setDescription(`There is no player named: **${args[0]}**`);
                    return message.reply(embed);
                }
                //get player from albion api
                player = new Player(await albionApi.execute(endpoints.getPlayerById, response.data.players[0].Id));
                
            }
        }
        
        var corellation = await correlationUserPlayerDiscoguildGet.execute(player.id,message.guild.id);
        if(corellation){
            //dodaj permy na wszelki W
            //napisz że chłop już jest i return
        }
        if(player.guildId==discoGuild.guildId){
            //dopisz permy, dodaj chłopa do bazy albionplayer i correlation
            //sprawdz tag, i nick, ustaw tag i nick
        }
        //if player is an ally and if guild lets ally in
        if(discoGuild.allowUsersStatusId==2&&discoGuild.albionAllianceId&&discoGuild.albionAllianceId==player.allianceId){
            //dopisz permy, dodaj chłopa do bazy albionplayer i correlation
            //sprawdz tag, i nick, ustaw tag i nick
        }
    }
}
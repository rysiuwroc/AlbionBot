const albionApi =require("../functions/albion-api.js");
const endpoints = require("../../configs/albion-api-config.json");
const {Guild} = require("./guild.js");

class Player{
    constructor(getPlayerByIdResponse){
        var player=getPlayerByIdResponse.data;
        
        this.id=player.Id;
        this.name=player.Name;
        this.pveFame=player.LifetimeStatistics.PvE.Total;
        this.pvpFame=player.KillFame;
        this.guildId=player.GuildId;
        this.guildName=player.GuildName;  
        this.allianceId=player.allianceId;  
        this.allianceTag=player.allianceTag;
    }
    async fetchRealAllianceData(){
        var guild=new Guild(await albionApi.execute(endpoints.getGuildById, this.guildId))
        if(guild.allianceTag){
            this.allianceId=guild.allianceId;
            this.allianceTag=guild.allianceTag;
        }
        else{
            this.allianceId="";
            this.allianceTag="";
        }
        
    }
}

module.exports= Player;

class Guild{
    constructor(getGuildByIdResponse){
        var guild = getGuildByIdResponse.data

        this.id = guild.Id;
        this.name = guild.Name;
        this.founderId= guild.FounderId;
        this.founderName= guild.FounderName;
        this.foundedDate= guild.Founded;
        this.allianceId= guild.AllianceId;
        this.allianceTag= guild.AllianceTag;
        this.allianceName= guild.AllianceName;
        this.memberCount= guild.MemberCount;
        this.killFame= guild.killFame;
        this.deathFame= guild.DeathFame;
    }
}

class ShortGuild{
    constructor(getGuildByIdResponse){
        this.id = getGuildByIdResponse.Id;
        this.name = getGuildByIdResponse.Name;
    }  
}

module.exports={
    Guild,
    ShortGuild
};
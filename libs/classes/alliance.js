const {ShortGuild} = require("./guild")

class Alliance{
    constructor(getAllianceByIdResponse){
        var alliance=getAllianceByIdResponse.data;

        this.id=alliance.AllianceId;
        this.name=alliance.AllianceName;
        this.tag=alliance.AllianceTag;
        this.founderId=alliance.FounderId;
        this.founderName=alliance.FounderName;
        this.founedDate=alliance.Founded;
        this.playerNum=alliance.NumPlayers;
        this.guildList=[];

        alliance.Guilds.forEach(element => {
            this.guildList.push(new ShortGuild(element))
        });
    }
}



module.exports= Alliance;
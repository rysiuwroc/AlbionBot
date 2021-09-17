const albionApi = require("../../functions/albion-api");
const endpoints = require("../../../configs/albion-api-config.json");
const Player = require("../../classes/player");
const { Guild } = require("../../classes/guild");
const Alliance = require("../../classes/alliance");
const albionFounderCreate = require("../../functions/db/albion-founder-create");
const albionAllianceCreate = require("../../functions/db/albion-alliance-create");
const albionGuildCreate = require("../../functions/db/albion-guild-create");
const dbGetByPk = require("../../functions/db/db-get-by-pk");
const discoGuildUpdate = require("../../functions/db/disco-guild-update");
const dbCheckByPk = require("../../functions/db/db-check-by-pk");
const Discord = require("discord.js")

module.exports = {
    name: "sguild",
    description: "Select discord server main guild by providing it's founder.",
    args: "true",
    usage: "<owners_name>",
    cooldown: 0,
    guildOnly: true,
    aliases: ["sg"],
    adminChannel: true,
    async execute(message, args) {
        let embed = new Discord.MessageEmbed()
        embed.setDescription(`Looking for **${args[0]}**'s Guild `)
        await message.channel.send(embed);
        let response = await albionApi.execute(endpoints.findPlayerByName, args[0]);
        //if response is OK
        if (response.status == 200) {
            //check if players found
            if (response.data.players.length == 0 || response.data.players[0].Name.toLowerCase() != args[0].toLowerCase()) {
                embed.setDescription(`There is no player named: **${args[0]}**`);
                return message.reply(embed);
            }

            try {

                var player = new Player(await albionApi.execute(endpoints.getPlayerById, response.data.players[0].Id))
                await player.fetchRealAllianceData();

                var guild;
                if (await dbCheckByPk.execute("albion_guilds", player.guildId).count) {
                    guild = await dbGetByPk.execute("albion_guilds", player.guildId);
                }
                else {
                    guild = new Guild(await albionApi.execute(endpoints.getGuildById, player.guildId));
                }

                if (player.id != guild.founderId) {
                    embed.setDescription(`**${player.name}** is not a founder of **${guild.name}**`);
                    return message.reply(embed);
                }

                var alliance;
                if (await dbCheckByPk.execute("albion_alliances", guild.allianceId).count) {
                    alliance = await dbGetByPk.execute("albion_alliances", guild.allianceId);
                }
                else {
                    alliance = new Alliance(await albionApi.execute(endpoints.getAllianceById, guild.allianceId));
                }

            }
            catch (error) {
                console.error(error);
                embed.setDescription(`There was a problem with Albion API, please try again in 5 minutes.`);
                return message.reply(embed);
            }

            await albionFounderCreate.execute(guild);
            await albionFounderCreate.execute(alliance);
            await albionAllianceCreate.execute(alliance);
            await albionGuildCreate.execute(guild);

            var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id)
            discoGuild.albionGuildId = guild.id;
            discoGuild.albionAllianceId = alliance.id;

            await discoGuildUpdate.execute(discoGuild);
            embed.setDescription(`Server guild set to: **${guild.name}**`);
            return message.reply(embed);


        }
        //error return
        return message.reply(`There was a problem with Albion API, please try again in 5 minutes.`);


    }
};
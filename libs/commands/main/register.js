module.exports = {
    name: "register",
    description: "",
    args: true,
    usage: "<IGN>",
    cooldown: 360,
    guildOnly: true,
    aliases: [],
    async execute(message, args) {
        var discoGuild = await dbGetByPk.execute("disco_guilds", message.guild.id)
    }
}
module.exports = {
    async execute(message,alias){
        message.member.setNickname(alias);
    }
}
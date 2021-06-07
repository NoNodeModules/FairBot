module.exports = (client) => {
    const channelId = '839957603232120863'

    client.on('guildMemberAdd', (member) =>{
        console.log(member)

        const message = `Hey <@${member.id}>`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })
}
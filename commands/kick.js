module.exports = {
    name: 'kick',
    description: "Kicks Member",
    execute(message, args){
        const member = message.mentions.users.first();
        if(member){
            const memberTarger = message.guild.members.cache.get(member.id);
            memberTarger.kick();
            message.channel.send("User wurde gekickt");
        }else{
            message.channel.send('DU kannst diesen Spieler nicht kicken!');
        }
    }
}
const Discord = require('discord.js')
const bot = new Discord.Client()
const TOKEN = 'ODQ5MzYzMDE5NDA5MzkxNjY4.YLaE9A.3tFa5Nm61Zj4fq6Go_5f0BJ3dcQ'
const prefix = '!'

bot.on('ready', () => {
    console.log('FairShop ist nun Online!')

    bot.user.setPresence({
        activity: {
            name: '',
            type: 'PLAYING',
        }
    })
})

bot.on('message', message => {
    let parts = message.content.split(" ");

    if(parts[0] == '!help') {
        message.channel.send('**Hier meine Befehle**\n**!clear**/**!purge** - Löscht bis zu 100 Nachrichten\n**!member** - Sagt dir, wieviele Mitglieder der Server hat, auf dem du dich befindest.\n**!owner** - Sagt dir, wer der die Eigentumsrechte von einem Server hat.\n**!userinfo <@>** - Damit kannst du dir die Benutzerinfo von dir oder jmd anderes anzeigen lassen')
    }
    else if(parts[0] == '!userinfo') {

        const guild = message.guild
        const usr = message.mentions.users.first() || message.author
        const member = guild.members.cache.get(usr.id)

        const userr = member.user

        const newEmbed = new Discord.MessageEmbed()
        .setColor('69e3e2')
        .setAuthor(`${usr.tag}`, `${usr.displayAvatarURL({dynamic: true})}`)
        .setThumbnail(`${usr.displayAvatarURL({dynamic: true})}`)
        .setDescription(`${usr}'s Informationen`)
        .addField('**Name + ID:**', `${usr.tag}`)
        .addField('**ID:**', `${usr.id}`)
        .addField('**Avatar URL:**', `${usr.displayAvatarURL({dynamic: true})}`)
        .addField('**Nickname (Wenn vorhanden):**', `${member.nickname || `Der Benutzer hat keinen Nickname`}`)
        .addField('**Dem Server gejoined:**', `${member.joinedAt}`)
        .addField('**Discord gejoined**', `${usr.createdAt}`)
        .addField('**Status:**', `${userr.presence.status}`)
        .addField('**Bot:**', `${usr.bot}`)
        .addFields({
            name: '**Rollenmenge:**',
            value: member.roles.cache.size - 1,
        })

        message.channel.send(newEmbed)
    }
    else if(message.content.includes('@BOTID')) {
        const embed = new Discord.MessageEmbed()
        .setColor('ff0000')
        .setTitle('**Was gibts?**')
        .addField('Brauchst du Hilfe?', 'Benutze t!help')
        .addField('Willst du dem Owner eine FA schicken?', `Hier der Name: **${message.guild.owner.user.tag}**`)
        .addField('Brauchst du bei sonst etwas Hilfe?', 'Wende dich an den Owner oder das Team')

        message.channel.send(embed)
    }
})

bot.login(process.env.TOKEN)
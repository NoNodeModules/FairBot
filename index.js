const Discord = require('discord.js');
const { captureRejectionSymbol } = require('events');
const prefix = '!'
const fs = require('fs')
const reactionRolesConfig = JSON.parse(fs.readFileSync('reactionroles.json' , 'utf8'))
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });


const messages = ['!help' , 'FairShop' , 'Coded by Jay'];
let current = 1;
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)

    client.user.setActivity(messages[0] ,{type: `PLAYING`})

    setInterval(() => {
        if(messages[current]){
            client.user.setActivity(messages[current] , {type: "PLAYING"})
            current++;
        } else{
            current = 0;
            client.user.setActivity(messages[current] , {type : "PLAYING"})
        }
    }, 5*1000)
});

client.on("messageReactionAdd", async (reaction, user) => {
    if(reaction.message.partial) reaction.fetch();
    if(reaction.partial) reaction.fetch();
    if(user.bot || !reaction.message.guild) return;
  
    for (let index = 0; index < reactionRolesConfig.reactions.length; index++) {
      let reactionrole = reactionRolesConfig.reactions[index];
  
      if(reaction.message.id == reactionrole.message && reaction.emoji.name == reactionrole.emoji){
        reaction.message.guild.members.cache.get(user.id).roles.add(reactionrole.role)
      }
    }
  })
  
  client.on("messageReactionRemove", async (reaction, user) => {
    if(reaction.message.partial) reaction.fetch();
    if(reaction.partial) reaction.fetch();
    if(user.bot || !reaction.message.guild) return;
  
    for (let index = 0; index < reactionRolesConfig.reactions.length; index++) {
      let reactionrole = reactionRolesConfig.reactions[index];
  
      if(reaction.message.id == reactionrole.message && reaction.emoji.name == reactionrole.emoji && reaction.message.guild.members.cache.get(user.id).roles.cache.has(reactionrole.role)){
        reaction.message.guild.members.cache.get(user.id).roles.remove(reactionrole.role)
      }
    }
  })

  
client.on('message', async (msg) => {
    if(msg.author.bot || !msg.guild) return;
  if(msg.content.startsWith('!createReactionRole') && msg.member.hasPermission('ADMINISTRATOR')){
    var args = msg.content.split(' ');
    if(args.length == 3){
      var emoji = args[1];
      var roleid = args[2]
      var role = msg.guild.roles.cache.get(roleid);
      if(!role){
        msg.reply('die rolle gibt es nicht')
        return;
      } 
      var embed = new Discord.MessageEmbed()
      .setTitle('Verify ' + emoji)
      .setDescription('Klicke auf ' + emoji + " um die Rolle " + `<@&${role.id}>` + " zu bekomme oder sie zu entfernen");
      var message = await msg.channel.send(embed)
      message.react(emoji)
      var toSave = {message: message.id, emoji: emoji,role: roleid}
      reactionRolesConfig.reactions.push(toSave);
      let data = JSON.stringify(reactionRolesConfig);
      fs.writeFileSync('reactionroles.json', data);   
     }
  }

})

    var cmdmap = {
        help: helpcommand,
        list: listcommand,
        uptime: uptimecommand,
        kick: kickcommand,
        ban: bancommand,
        say: saycommand
        
    }

function listcommand (message, args) {
    const channel = message.channel
    const embed = new Discord.MessageEmbed()
    .setColor('#7852FF')
    .setAuthor('Liste')
    .addField('» !help |', 'Zeigt dir eine Hilfe an')
    .addField('» !list |', 'Zeigt dir alle Befehle an')
    .addField('» !info |', 'Zeigt dir Infos über Spieler an')
    .addField('» !uptime |', 'Zeigt dir die Zeit, wielange der Bot schon online ist, an')
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);
}

function helpcommand (message, args) {
    const channel = message.channel
    const embed = new Discord.MessageEmbed()
    .setColor('#7852FF')
    .setAuthor('Hilfe')
    .addField('Brauchst du Hilfe?', 'Erstelle ein Ticket mit **!ticket**')
    .addField('Du willst jemanden Reporten?', 'Melde ihn mit **!report** [**user**] [**grund**]')
    .addField('Willst du dem **Owner** eine FA schicken?', `Hier der Name: **${message.guild.owner.user.tag}**`)
    .addField('Brauchst du bei sonst etwas **Hilfe?**', 'Wende dich an den **Owner** oder **das Team**')
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);

}

function saycommand (message, args) {
    const channel = message.channel
    const messagToSay = args.join(" ");
    const embed = new Discord.MessageEmbed()
    .setColor('#7852FF')
    .setAuthor(`${messagToSay}`)
    .addField(`${messageToSay}`)
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);

}

function uptimecommand (message, args) {
    let days = Math.floor(client.uptime / 86400000 );
    let hours = Math.floor(client.uptime / 3600000 ) % 24;
    let minutes = Math.floor(client.uptime / 60000 ) % 60;
    let seconds = Math.floor(client.uptime / 1000 ) % 60;
    const channel = message.channel
    const embed = new Discord.MessageEmbed()
    .setColor('#7852FF')
    .setAuthor('Uptime')
    .setDescription(`» Der Bot ist seit **${days} Tagen**, **${hours} Stunden**, **${minutes} Minuten** und **${seconds} Sekunden** online!`)
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);
}

function kickcommand (message, args) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Du brauchst die Berechtigung, um zu Kicken!')
    const channel = message.channel
    const member = message.mentions.users.first();
    const usr = message.mentions.users.first() || message.author
    if(member){
        const memberTarger = message.guild.members.cache.get(member.id);
        memberTarger.kick();
        const embed = new Discord.MessageEmbed()
        .setColor('#7852FF')
        .setAuthor('Kick')
        .addField(`Der User **${usr.tag}** wurde gekickt`, 'Grund | kein Grund')
        .setFooter('Coded by Jay 🔥')
        channel.send(embed);
    } else{
        message.channel.send('Du musst ein Spieler angeben!')
    }

}

function bancommand (message, args) {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('Du brauchst die Berechtigung, um zu Banen!')
    const channel = message.channel
    const member = message.mentions.users.first();
    const usr = message.mentions.users.first() || message.author
    if(member){
        const memberTarger = message.guild.members.cache.get(member.id);
        memberTarger.ban();
        const embed = new Discord.MessageEmbed()
        .setColor('#7852FF')
        .setAuthor('Kick')
        .addField(`Der User **${usr.tag}** wurde gebannt`, 'Grund | kein Grund')
        .setFooter('Coded by Jay 🔥')
        channel.send(embed);
    } else{
        message.channel.send('Du musst ein Spieler angeben!')
    }

}

client.on('message', message => {
    let parts = message.content.split(" ");
    if(parts[0] == '!clear') {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('Du brauchst die Berechtigung, Nachrichten zu löschen!')
        if(!parts[1]) return message.channel.send('Du musst angeben, wieviele Nachrichten du löschen möchtest!')
        if(isNaN(parts[1])) return message.channel.send('Die Angabe, wieviele Nachrichten du löschen möchtest, muss eine Zahl sein!')
        if(parts[1] > 100) return message.channel.send('Du kannst nicht mehr als **100** Nachrichten löschen!')
        if(parts[1] < 1) return message.channel.send('Du kannst nicht weniger als 1 Nachricht löschen')
        message.channel.bulkDelete(parts[1])
        message.channel.send(`Ich habe erfolgreich **${parts[1]}** Nachrichten gelöscht!`).then(m => m.delete({timeout: 3000}))
    }
    else if(parts[0] == '!info') {
            if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("Du brauchst die Berechtigung, Infos abzurufen!");

            const guild = message.guild
            const usr = message.mentions.users.first() || message.author
            const member = guild.members.cache.get(usr.id)

            const userr = member.user

            const embed = new Discord.MessageEmbed()
            .setColor('#7852FF')
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
            .setFooter('Coded by Jay 🔥')

            message.channel.send(embed)
        }

        


    if (!message.guild) return;
    var cont = message.content,
        author = message.member,
        channel = message.channel,
        guild = message.guild

    if (channel.type !== "text") return

    if (message.author.bot) return

    if (cont.startsWith('!')) {
        if (author.id !== client.user.id) {

            var invoke = cont.split(' ')[0].substr(prefix.length).toLowerCase(),
                args = cont.split(' ')

            try {
                if (invoke in cmdmap) {
                    cmdmap[invoke](message, args)
                } else {
                    const embed = new Discord.MessageEmbed()
                    .setColor('#7852FF!')
                    .setAuthor('FairShop | Bot')
                    .setDescription('🔥 | Der Command wurde nicht registriert')
                    channel.send(embed); 
                }        
            } catch (e) {
                console.log(e)
            }
        }
      }

      
});
client.login('ODQ5MzYzMDE5NDA5MzkxNjY4.YLaE9A.Oi7CehQgxIlfouiftshmDo1-348')
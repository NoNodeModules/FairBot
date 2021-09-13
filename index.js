const { clear } = require('console');
const Discord = require('discord.js');
const prefix = '!'
const fs = require('fs')
const reactionRolesConfig = JSON.parse(fs.readFileSync('reactionroles.json' , 'utf8'))
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
const welcomechannelId = `853727010748629032` //Channel You Want to Send The Welcome Message

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



client.on('guildMemberAdd', (member) => {

    member.roles.add('840706781223452702')
    console.log(member) // If You Want The User Info in Console Who Joined Server Then You Can Add This Line. // Optional
    const channel = member.guild.channels.cache.get(welcomechannelId)

    const embed = new Discord.MessageEmbed()
    .setTitle(`Willkommen`)
    .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
    .setDescription(` <@${member.user.id}>, Willkommen bei **${member.guild.name}**`)
    .setColor('#7852FF')
channel.send(embed)

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

  client.on('messageReactionAdd', async (reaction, user, member) =>{
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
        
        if(reaction.emoji.name === "🔵"){
            reaction.users.remove(user);

            reaction.message.guild.channels.create(`ticket ${user.username.substr(0,18)}`, {
                type: "text",
                parent: "852675454087069717",
                topic: `Ticket von ${user.tag}, wenn du das Ticket schließen möchtest reagiere mit 🔒`,
                permissionOverwrites: [
                { id: user.id, allow: ["SEND_MESSAGES", "VIEW_CHANNEL"], },
                { id: reaction.message.guild.roles.everyone, deny: ['VIEW_CHANNEL'], },
            ]
            })
            .then(ch => {
                const embed = new Discord.MessageEmbed()
                .setColor('#7852FF')
                .setAuthor(`Support, ${user.username}`)
                .addField('» Der Support wird sich in Kürze bei Ihnen melden, bitte schreiben sie ihre Frge direkt in den Chat. Die Leitung wird gleich für sie da sein, wir bitten um ihr Verständnis dafür, dass wir nicht jedes Anleigen direkt bearbeiten können.', 'Bitte haben sie etwas geduld!')
                .addField('Grund :' , 'Generelle Frage')
                .setFooter('Coded by Jay 🔥')
                ch.send(embed).then(msg => msg.react('🔒'))
            })
        }
    }
) 

  client.on('messageReactionAdd', async (reaction, user, member) =>{
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
        
        if(reaction.emoji.name === "🟢"){
            reaction.users.remove(user);
            

            reaction.message.guild.channels.create(`ticket ${user.username.substr(0,18)}`, {
                type: "text",
                parent: "852675454087069717",
                topic: `Ticket von ${user.tag}, wenn du das Ticket schließen möchtest reagiere mit 🔒`,
                permissionOverwrites: [
                { id: user.id, allow: ["SEND_MESSAGES", "VIEW_CHANNEL"], },
                { id: reaction.message.guild.roles.everyone, deny: ['VIEW_CHANNEL'], },
            ]
            })
            .then(ch => {
                const embed = new Discord.MessageEmbed()
                .setColor('#7852FF')
                .setAuthor(`Support, ${user.username}`)
                .addField('» Der Support wird sich in Kürze bei Ihnen melden, bitte schreiben sie ihre Frage direkt in den Chat. Die Leitung wird gleich für sie da sein, wir bitten um ihr Verständnis dafür, dass wir nicht jedes Anleigen direkt bearbeiten können.', 'Bitte haben sie etwas geduld!')
                .addField('Grund :' , 'Frage zu FairShop')
                .setFooter('Coded by Jay 🔥')
                ch.send(embed).then(msg => msg.react('🔒'))
            })
        }
    }
) 

client.on('messageReactionAdd', async (reaction, user)=> {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;
    if(!reaction.message.guild) return;
    
    if(reaction.emoji.name === "🔒"){
        if(!reaction.message.channel.name.includes('ticket-')) return;
        reaction.users.remove(user)
    
        reaction.message.react('✅')
        reaction.message.react('❎')

        }
})

client.on('messageReactionAdd', async (reaction, user)=> {
if(reaction.message.partial) await reaction.message.fetch();
if(reaction.partial) await reaction.fetch();
if(user.bot) return;
if(!reaction.message.guild) return;

if(reaction.emoji.name === "✅"){
    if(!reaction.message.channel.name.includes('ticket-')) return;
    
    const embed = new Discord.MessageEmbed()
    .setColor('#7852FF')
    .setAuthor('Support')
    .addField('» Ticket wird in **5** Sekunden schließen!', 'Coded by Jay 🔥')
    reaction.message.channel.send(embed)
    setTimeout(() => reaction.message.channel.delete(), 5000);
}
})

client.on('messageReactionAdd', async (reaction, user)=> {
if(reaction.message.partial) await reaction.message.fetch();
if(reaction.partial) await reaction.fetch();
if(user.bot) return;
if(!reaction.message.guild) return;

if(reaction.emoji.name === "❎"){
    if(!reaction.message.channel.name.includes('ticket-')) return;
    
    
    reaction.message.reactions.cache.get(`✅`).remove()
    reaction.message.reactions.cache.get(`❎`).remove()
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
        status: statuscommand,
        giveaway: giveawaycommand,
        tlog: tlogcommand,
        tremove: tremovecommand,
        ticketsetup: ticketsetupcommand,
        clear,
        


    
        
    }
function giveawaycommand () {
}
function tlogcommand () {
}
function tremovecommand () {
}
function ticketsetupcommand () {
}
function statuscommand () {
}

function listcommand (message, args) {
    const channel = message.channel
    const embed = new Discord.MessageEmbed()
    .setColor('#7852FF')
    .setAuthor('Liste')
    .addField('» !help |', 'Zeigt dir eine Hilfe an')
    .addField('» !list |', 'Zeigt dir alle Befehle an')
    .addField('» !info |', 'Zeigt dir Infos über Spieler an')
    .addField('» !status |', 'Zeigt dir den Status über FairShop an')
    .addField('» !uptime |', 'Zeigt dir die Zeit, wielange der Bot schon online ist, an')
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);
}

function helpcommand (message, args) {
    const channel = message.channel
    const embed = new Discord.MessageEmbed()
    .setColor('#7852FF')
    .setAuthor('Hilfe')
    .addField('Brauchst du Hilfe?', 'Erstelle ein Ticket in **#➥📝support**')
    .addField('Willst du dem **Owner** eine FA schicken?', `Hier der Name: **${message.guild.owner.user.tag}**`)
    .addField('Brauchst du bei sonst etwas **Hilfe?**', 'Wende dich an den **Owner** oder **das Team**')
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);

}

function mutecommand (message, args) {
    const channel = message.channel
    const embed = new Discord.MessageEmbed()
    .setColor('#7852FF')
    .setAuthor('Hilfe')
    .addField('Brauchst du Hilfe?', 'Erstelle ein Ticket in **#➥📝support**')
    .addField('Willst du dem **Owner** eine FA schicken?', `Hier der Name: **${message.guild.owner.user.tag}**`)
    .addField('Brauchst du bei sonst etwas **Hilfe?**', 'Wende dich an den **Owner** oder **das Team**')
    .setFooter('Coded by Jay 🔥')
    channel.send(embed);

}

    client.on('message', async (message) => {
        let parts = message.content.split(" ");
        if(parts[0] == '!ticketsetup') {
        let channel = message.mentions.channels.first();
        if(!channel) return message.reply("Nutze | !ticketsetup #channel");

        let sent = await channel.send(new Discord.MessageEmbed()
        .setColor('#7852FF')
        .setAuthor('Support')
        .addField(`Du brauchst Support? Kein Problem! Wähle einfach eines der Symbole aus, deren Beschreibung am ehesten auf dein Anliegen zutrifft und reagiere mit ihm auf diese Nachricht.`)
        .addField(`🔵 | Generelle Fragen`, `Z.B. Fragen zu Discord/ FairShop, unseren Bots, Rängen, ... und sontigem`)
        .addField(`🟢 | Fragen zu FairShop`, `Z.B. Fragen zu FairShop, Beschwerden, Probleme, Fehler, ... und sonstiges`)
        .setFooter('Coded by Jay 🔥')
        );

        sent.react('🔵');
        sent.react('🟢');
        message.channel.send("Ticket erstellt")
    }
})

client.on('message', async (msg) => {
  if(msg.author.bot || !msg.guild) return;
  if(msg.content.startsWith('!tlog') && msg.member.hasPermission('ADMINISTRATOR')){
    var args = msg.content.split(' ');
    if(args.length == 3){
      var member = args[1];
      var roleid = args[2]
      var role = msg.guild.roles.cache.get(roleid);
      if(!role){
        msg.reply('die rolle gibt es nicht')
        return;
      } 
      var embed = new Discord.MessageEmbed()
      .setColor('#7852FF')
      .setTitle('Team-Changelog')
      .setDescription(member + " ist dem Team als " + `<@&${role.id}>` + " beigetreten!");
      var message = await msg.channel.send(embed)  
    }
}
})

client.on('message', async (msg) => {
    if(msg.author.bot || !msg.guild) return;
  if(msg.content.startsWith('!tremove') && msg.member.hasPermission('ADMINISTRATOR')){
    var args = msg.content.split(' ');
    if(args.length == 3){
      var member = args[1];
      var roleid = args[2]
      var role = msg.guild.roles.cache.get(roleid);
      if(!role){
        msg.reply('die rolle gibt es nicht')
        return;
      } 
      var embed = new Discord.MessageEmbed()
      .setColor('#7852FF')
      .setTitle('Team-Changelog')
      .setDescription(member + " hat das Team als " + `<@&${role.id}>` + " verlassen!");
      var message = await msg.channel.send(embed)  
    }
}
})



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
    let toKick = message.mentions.members.first();
    let reason = args.slice(1).join(" ");
    if(!args[0]) return message.channel.send('Bitte gib ein Spieler an!');
    if(!toKick) return message.channel.send(`${args[0]} ist kein Spieler`);
    if(!reason) return message.channel.send(`Gib ein Grund an`);

    if(!toKick.kickable){
        return message.channel.send('Ich kann kein Admin kicken!')
    }

    if(toKick.kickable){
        let x = new Discord.MessageEmbed()
        .setColor('#7852FF')
        .setAuthor('Kick')
        .addField(`Kick |`, toKick)
        .addField(`von | `, message.author)
        .addField(`Grund | `, reason)
        .addField(`Datum | `, message.createdAt)
        .setFooter('Coded by Jay 🔥')
        message.channel.send(x);
        toKick.kick();
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
        message.channel.send(`Ich habe erfolgreich **${parts[1]}** Nachrichten gelöscht!`).then(m => m.delete({timeout: 500}))
    }
    if(parts[0] == '!info') {
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
client.login('ODQ5MzYzMDE5NDA5MzkxNjY4.YLaE9A.Yzo07THwxzgfVTbQ-bhz9OqXb90')

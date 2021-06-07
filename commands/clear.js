module.exports = {
    name: 'clear',
    description: "Clear",
    execute(message, args){
        if(!args[0]) return message.reply("Du musst angeben, wieviele Nachrichten du löschen möchtest!");
        if(isNaN(args[0]) return message.reply("Bitte gebe eine Korrekte Zahl ein!");
        
        if(args[0] > 100) return message.reply("Du kannst nicht mehr als 100 Nachrichten löschen!");
        if(args[0] < 1) return message.reply("DU musst min. 1 Naricht löschen!");

        await message.channel.message.fetch({limit: args[0]}).then(message =>{
            message.channel.bulkDelete(messages);
        });
    }
}
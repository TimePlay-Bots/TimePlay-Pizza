const Discord = require("discord.js")
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let db = client.con 
    let m = args.slice(" ").join(" ")
    if(!m) return message.reply("Bitte gib etwas an was du Bestellen willst!")
    db.query("SELECT * FROM `order` WHERE id = ?", [message.author.id], async (error, result) => {
        if(result.length == 0) {
            db.query("INSERT INTO `order` (guilid, id, name) VALUES (?, ?, ?)", [message.guild.id, message.author.id, m])
           let c = message.guild.channels.get("680061426190123118")
            let embed = new Discord.RichEmbed()
            .setTitle("**Neue Bestellung**")
            .addField("Bestellung von", `<@${message.author.id}>`)
            .addField("Server", message.guild.name)
            .addField("Bestellung", m)
            .addField("Bestellungs ID", message.author.id)

            c.send(embed)
            return message.channel.send("Bestllung wurde erstellt!")

        } else {
            message.channel.send("Du hast schon eine Bestellung!")
        }
    })
}
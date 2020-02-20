const Discord = require("discord.js")
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    if(message.channel.id.toLowerCase() === '680061497472450607') {
    let db = client.con 
    let orderid = args[0]
    let cook = args.slice(1)
    if(!cook) return message.reply("Bitte Koche die Bestellung für den Kunden!")
    db.query("SELECT * FROM `order` WHERE id = ?", [orderid], async (error, result) => {
        if(result.length == 0) {
            return message.channel.send("Es liegt keine Bestellung für diese ID vor!")
        } else {
            let c = message.guild.channels.get("680061426190123118")
            let d = message.guild.channels.get("680069010695520290")
            let embed = new Discord.RichEmbed()
            .setDescription(`Die Bestellung von <@${result[0].id}> wurd erledigt!`)
            let gid = result[0].guilid
            let id = result[0].id
            let name = result[0].name
            db.query("INSERT INTO `deliver` (guilid, id, name, link) VALUES (?, ?, ?, ?)", [gid, id, name, cook])
            message.channel.send("Koche bestellung....")
            db.query("DELETE FROM `order` WHERE ID = ?", [result[0].id])
            message.channel.send("Fertig!")
            let emb = new Discord.RichEmbed()
            .setTitle("Neue Auslieferung")
            .addField("Name", `<@${id}>`)
            .addField("ID", orderid)
            .addField("GuildID", gid)
            c.send(embed)
            return d.send(emb)
        }
    })
} else {
    return
}
}
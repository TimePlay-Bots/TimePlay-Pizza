const Discord = require("discord.js")
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    if(message.channel.id.toLowerCase() === '680061520629202965') {
    let db = client.con 
    let deliverid = args[0]
    db.query("SELECT * FROM `deliver` WHERE id = ?", [deliverid], async (error, result) =>{
        if(result.length == 0) {
            message.reply("Es liegt keine lieferung für die ID vor!")
        } else {
            let t = client.guilds.get(result[0].guilid).name
            client.guilds.get(client.guilds.find(server => server.name === t).id).channels.filter(channels => channels.type == "text").first().createInvite().then(invite => {
                message.channel.send("Warte ich überprufe alles")
                message.author.send(invite.url)
                let name = result[0].name
                let link = result[0].link
                message.author.send(`Hey, <@${deliverid}> deine bestellung ist fertig!\n Du hast eine ${name} Bestellt!\n Guten Appetit dir!\n ${link}`)
                db.query("DELETE FROM `deliver` WHERE id = ?", [deliverid])
                let d = message.guild.channels.get("680069010695520290")
                let embed = new Discord.RichEmbed()
                .setDescription(`Die Lieferung von <@${result[0].id}> wurd erledigt!`)
                d.send(embed)
            })
        }
    })
} else {
    return
}
}
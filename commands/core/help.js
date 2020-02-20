const Discord = require("discord.js")
module.exports.run = async (prefix, cmd, client, args, message, config) => {
    let embed = new Discord.RichEmbed()
    .setTitle("Data Pizza - Hilfe")
    .setDescription("Du kannst mit p!order eine bestellung abgeben!")

    return message.channel.send(embed)
}
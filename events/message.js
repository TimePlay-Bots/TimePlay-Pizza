const fs = require("fs");
const active = new Map();
const Discord = require("discord.js")

module.exports = async (client, message) => {
  if (message.author.bot) {
    return;
  }
  
  let prefix = client.config.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
  let author = message.author;
  let guild = message.guild;

  let badwords = ["Fuck", "Penis", "Ficken", "Fotze", "Hurrensohn", "Scheide", "Muschi", "Schlampe", "Hure"]
  let link = ["discord.gg", "invite.gg", "discord.io", "https://discordapp.com/invite/"]
 
  let foundin = false;
  for (var i in badwords) {
    if (message.content.toLowerCase().includes(badwords[i].toLowerCase())) foundin = true;
    if(message.member.hasPermission("ADMINISTRATOR")) foundin = false;
  }
  if (foundin) {
    message.delete();
    message.channel.send("Bitte benutzte eine andere ausdrucks weise!")
  }
  let linktxt = false;
  for (var i in link) {
    if (message.content.toLowerCase().includes(link[i].toLowerCase())) linktxt = true;
    if(message.member.hasPermission("ADMINISTRATOR")) linktxt = false;
  }
  if (linktxt) {
    message.delete();
    message.channel.send("Bitte sende keine links!")
  }

  if (!message.content.startsWith(prefix)) {
    return;
  }

  let commandFile = client.commands.get(cmd.slice(prefix.length));
  if (commandFile) {
    commandFile[0].run(prefix, cmd, client, args, message);
 }

};
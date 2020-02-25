
const Discord = require("discord.js");
const client = new Discord.Client(); 
const config = require("./config.json");
const Music = require('discord.js-musicbot-addon');


client.on("ready", () => {
  console.log(`aku siap`); 
  client.user.setActivity(`with Otouto chan`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong!${m.createdTimestamp - message.createdTimestamp}`);
  }
  
  if(command === "say") {
  
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "p") {
  
    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("hanya bisa membersikan 2 sampai 100 chat");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`tidak bisa menghapus karena: ${error}`));
  }

  const music = new Music(client, {
    youtubeKey: 'sum-key_hhereas'
  });

 



});

client.login(config.token);
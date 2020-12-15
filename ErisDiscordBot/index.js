// Setting up the bot...

const Eris = require("eris");
const config = require("./config.json");
const bot = new Eris.CommandClient(config.token, {}, { 
    prefix: (config.prefix)
}); 

// Delete default help command!

bot.unregisterCommand("help")
console.log("[+] Removed the default help commmand!")

bot.on("ready", () => { // When the bot is ready
    console.log(`[+] Logged in as ${bot.user.username} - ${bot.user.id}`); 
    bot.editStatus({name: `${bot.guilds.size} Guilds`, type: 3});
});

bot.on("guildCreate", (guild) => { // Change status when joined a guild
    console.log(`[+] Joined Guild: ${guild.name}`);
    bot.editStatus({name: `${bot.guilds.size} Guilds`, type: 3}); // Type 3 = watching
});

bot.on("guildDelete", (guild) => { // Change status when left a guild
    console.log(`[+] Left Guild: ${guild.name}`);
    bot.editStatus({name: `${bot.guilds.size} Guilds`, type: 3}); // Type 3 = watching
})

bot.on(`error`, (err) => {
    // Ignore the error by just logging it in the console.
    console.log(err)
    console.error("[+] Error!")
})

// Commands

bot.registerCommand("userstats", (msg) => {
    bot.createMessage(msg.channel.id, {
        embed: {
            title: "Userstats",
            description: "A list of your user stats!",
            color: 0x00000, // Edit the embed color if you'd like to
            fields: [
                {
                    name: "__username__",
                    value: `${msg.author.username}#${msg.author.discriminator}`,
                    inline: false
                },
                {
                    name: "__userId__",
                    value: `${msg.author.id}`,
                    inline: false
                },
                {
                    name: "__userIsBot__",
                    value: `${msg.author.bot}`,
                    inline: false
                }
            ]
        }
    })
})

bot.registerCommand("eval", (message) => {
    if (message.author.id == "386519018577592331")
    {
        const args = message.content.substring(prefix.length).split(' ');
        const command = args.slice(1).join(' ');

        if(!command) return message.channel.send('Specify something to evaluate');
                    
        try {
            const evaled = eval(command);
                
            message.channel.send(`\`\`\`js\n${inspect(evaled, { depth: 0 })}\`\`\``);
        } catch (error) {
            message.channel.send(`Error`, `${error}`);
        }
    }
})


bot.connect();

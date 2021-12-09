(async () => {
    const { Intents, Collection, MessageEmbed, MessageAttachment } = require("discord.js");
    const Bot = require("./src/schemas/Bot")

    const client = new Bot({ 
        partials: ['MESSAGE', 'CHANNEL'],
        fetchAllMembers: false,
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS]    
    });

    await require("./src/functions/register.js").registerEvents(client, "../events");

    await client.login(client.config.token);
})()
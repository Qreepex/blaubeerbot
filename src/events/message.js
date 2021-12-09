const BaseEvent = require("../schemas/Event");
const { MessageEmbed, Bot, Message } = require("discord.js")

module.exports = class extends BaseEvent {
    constructor() {
        super('messageCreate');
    };

    /**
     * 
     * @param {Bot} client 
     * @param {Message} msg 
     */

    async run(client, msg) {
        if(msg.author.bot) return
        if(!msg.guild) return

        if(msg.content.toLowerCase() === "gg") {
            msg.react("<:gg:918570436424519730>");
        }

        if(msg.channel.id === "901882413150527589") {
            msg.react("👍");
            msg.react("👎");
        };

        if(msg.channel.id === "917117503413563482") {
            let content = msg.content;
            msg.delete().catch(console.warn);
            msg.channel.send({ embeds: [ new MessageEmbed().setDescription(content).setColor("BLURPLE") ]}).catch(console.warn);
        };
    };
};
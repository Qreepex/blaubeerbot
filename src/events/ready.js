const { Client } = require("discord.js");
const BaseEvent = require("../schemas/Event");

class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    };

    /**
     * 
     * @param {Client} client 
     */
    async run(client) {
        console.log("ready");

   //     client.commands.forEach(command => {
       //     command.initialize()
    //    });

        let x = 0;
        setInterval(() => {
            let status = client.config.statusMessages[x];
            if(!status) {
                x = 0;
                status = client.config.statusMessages[x];
            }
            client.user.setPresence({ activities: [{ type: status.split("_")[0], name: status.split("_")[1] }], afk: false });
            x++;
        }, 30000)
    };
};

module.exports = ReadyEvent;
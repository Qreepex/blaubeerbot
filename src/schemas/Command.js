const { MessageEmbed } = require("discord.js")
module.exports = class BaseCommand {
    constructor(client, {
        description = "",
		name = "Beispiel Command",

		options = []
    }) {
		this.client = client;
		this.config = { modOnly, adminOnly, devOnly, headOnly, noTrainee, options };
		this.help = { name, description };
		this.interaction = null
    }

	async run(interaction) {

    }

	initialize() {
        this.rest.applications(this.client.user.id).guilds(this.client.config.guild).commands.post({
            data: {
                name: this.help.name,
                description: this.help.description,
                options: this.config.options
            }
        }).catch(e => { console.log(e) })
	}

    delete() {
        this.rest.applications(this.client.user.id).guilds(this.client.config.guild).commands.post({
            data: {
                name: this.help.name,
                description: this.help.description,
                options: this.config.options
            }
        }).catch(e => { console.log(e) })
	}

	response(input, ephemeral = true, components = []) {
		var _a, _b;
        if (this.client && this.interaction) {
            let data = { data: {
                    type: 4,
                    data: {
                        flags: ephemeral ? (1 << 6) : 0,
                        components: components
                    }
                } };
            typeof input == "string" ? data.data.data.content = input : data.data.data.embeds = [input.color ? input : input.setColor("GREEN")];
            this.rest.interactions((_a = this.interaction) === null || _a === void 0 ? void 0 : _a.id, (_b = this.interaction) === null || _b === void 0 ? void 0 : _b.token).callback.post(data).catch(e => console.log(e));
        }
	}

	error(text) {
		var _a, _b;
        if (this.client && this.interaction) {
            this.rest.interactions((_a = this.interaction) === null || _a === void 0 ? void 0 : _a.id, (_b = this.interaction) === null || _b === void 0 ? void 0 : _b.token).callback.post({ data: {
                    type: 4,
                    data: {
                        embeds: [new MessageEmbed().setColor('#ff0000').setDescription(":x: " + text)],
                        flags: 1 << 6,
                    }
                }
			}).catch(e => {});
        }
	}

	get rest() {
        return this.client.api;
    }
}
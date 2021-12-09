const { MessageEmbed, MessageSelectMenu, MessageActionRow } = require("discord.js");
const BaseEvent = require("../schemas/Event");

module.exports = class extends BaseEvent {
    constructor() {
        super('interactionCreate');
    };

    async run(client, interaction) {
        if(interaction.guildId != client.config.guild) return
        if(interaction.type === "APPLICATION_COMMAND") {
            let command = client.commands.get(interaction.commandName)
            if(!command) return
            command.interaction = interaction

            if(command.config.modOnly && !interaction.member.roles.cache.get(client.config.roles.mod)) return interaction.reply({ ephemeral: true, embeds: [new MessageEmbed().setColor("#ff0000").setDescription(":x: Du hast keine Rechte, diesen Command zu benutzen.")]})
            if(command.config.devOnly && !interaction.member.roles.cache.get(client.config.roles.dev)) return interaction.reply({ ephemeral: true, embeds: [new MessageEmbed().setColor("#ff0000").setDescription(":x: Du hast keine Rechte, diesen Command zu benutzen.")]})
            if(command.config.headOnly && !interaction.member.roles.cache.get(client.config.roles.headmod)) return interaction.reply({ ephemeral: true, embeds: [new MessageEmbed().setColor("#ff0000").setDescription(":x: Du hast keine Rechte, diesen Command zu benutzen.")]})
            if(command.config.adminOnly && !interaction.member.roles.cache.get(client.config.roles.admin) && interaction.user.id != "702454609737940992") return interaction.reply({ ephemeral: true, embeds: [new MessageEmbed().setColor("#ff0000").setDescription(":x: Du hast keine Rechte, diesen Command zu benutzen.")]})
            if(command.config.noTrainee && interaction.member.roles.cache.get(client.config.roles.trainee)) return interaction.reply({ ephemeral: true, embeds: [new MessageEmbed().setColor("#ff0000").setDescription(":x: Du hast keine Rechte, diesen Command zu benutzen.")]})

            command.run(interaction, client)
        } 
    };
};
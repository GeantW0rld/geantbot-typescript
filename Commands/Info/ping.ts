import { client } from "../..";
import { SlashCommandBuilder, EmbedBuilder } from "discord.js"

export default new client.command({
    structure: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Get the ping of the bot"),
    run: async (client, interaction) => {
        await interaction.deferReply()

        const reply = await interaction.fetchReply()
        const ping = reply.createdTimestamp - interaction.createdTimestamp
        const uptime = `${client.readyTimestamp / 1000}`

        const embed = new EmbedBuilder()
        .setTitle("Pong!")
        .addFields(
            { name: "Websocket", value: `${client.ws.ping}ms`, inline: true },
            { name: "Interaction", value: `${ping}ms`, inline: true },
            { name: "uptime", value: `<t:${parseInt(uptime)}:R>` }
        )
        .setColor("Random")

        await interaction.editReply({ embeds: [embed] })
    }
})
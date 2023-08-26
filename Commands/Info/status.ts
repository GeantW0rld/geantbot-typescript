import axios from "axios";
import { client } from "../..";
import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js"
import Monitor from "ping-monitor"
import { connection } from "mongoose"

export default new client.command({
    structure: new SlashCommandBuilder()
    .setName("status")
    .setDescription("get bot status"),
    run: async(client, interaction) => {
        await interaction.deferReply()
        let currentip = null
        let pingbot = 0
        const uptime = `${client.readyTimestamp / 1000}`

        axios({
            url: "http://ip-api.com/json",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            currentip = res.data.query
            const myMonitor = new Monitor({
                address: currentip,
                port: 8080,
                interval: 15,
                protocol: "udp"
            })

            myMonitor.on("up", function (res, state) {
                myMonitor.stop()
                pingbot = res.responseTime

                
            const embed = new EmbedBuilder()
            .setTitle("Here is my stats")
            .setDescription("Bots stats")
            .addFields(
                {
                    name: "Discord Websocket",
                    value: `${client.ws.ping} ms`,
                    inline: true
                },
                {
                    name: "Client",
                    value: `${pingbot} ms`,
                    inline: true
                },
            )
            .addFields(
                {
                    name: "Database",
                    value: `\`${switchTo(connection.readyState)}\``,
                    inline: true,
                },
                {
                    name: "Uptime",
                    value: `<t:${parseInt(uptime)}:R>`,
                    inline: true
                }
            )
            .addFields(
                {
                    name: "Total servers",
                    value: `${client.guilds.cache.size}`,
                    inline: true
                },
                {
                    name: "Total users",
                    value: `${client.users.cache.size}`,
                    inline: true
                }
            )
            .setColor("Blue")
            .setFooter({text: `🦆 Made by GeantWorld Inc.`})
            .setTimestamp()

            const row = new ActionRowBuilder().addComponents(

                new ButtonBuilder()
                .setLabel("dashboard")
                .setStyle(ButtonStyle.Link)
                .setURL("https://geantbot.xyz/dashboard")

            )


            function switchTo(val) {
                var status = " ";
                switch(val) {
                    case 0: status = `🔴 Disconnected`
                    break;
                    case 1: status = `🟢 Connected`
                    break;
                    case 2: status = `🟠 Connecting...`
                    break;
                    case 3: status = `🟣 Disconnection in progress`
                    break;
                }
                return status
            }

                return interaction.editReply({embeds: [embed]})
            })

            myMonitor.start()
        })
    }
})
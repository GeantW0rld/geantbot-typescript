import { client } from "../.."
import { ActivityType } from "discord.js"

client.once("ready", () => {
    client.user.setPresence({ activities: [{ name: `discord.js v14 | typescript`, type: ActivityType.Competing }] })

    console.log(`${client.user.tag} is online`)
})
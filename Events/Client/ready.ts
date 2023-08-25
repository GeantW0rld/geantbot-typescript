import { client } from "../.."
import { ActivityType } from "discord.js"
import mongoose from "mongoose"

client.once("ready", () => {
    client.user.setPresence({ activities: [{ name: `discord.js v14 | typescript`, type: ActivityType.Competing }] })

    console.log(`${client.user.tag} is online`)

    const mongoURL = process.env.database

    if (!mongoURL) return;
    mongoose.connect(mongoURL, {
        useNewUrlParser: true, // ignore the error
        useUnifiedTopology: true, 
    }).then(() => {
        console.log("database connected!")
    }).catch(err => console.log(err))
})
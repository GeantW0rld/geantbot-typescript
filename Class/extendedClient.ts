import { Client, Collection, Partials, REST, Routes } from "discord.js";
import { Command } from "../types";
import { readdirSync } from "fs";
const { Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent } = Partials

export default class extends Client {
    public commands: Collection<string, Command> = new Collection()
    public commandsArray: Command['structure'][] = [];

    constructor() {
        super({
            intents: 131071,
            partials: [Channel, GuildMember, Message, Reaction, ThreadMember, User, GuildScheduledEvent]
        });
    };

    public loadCommands() {
        for (const dir of readdirSync("./Commands/")) {
            for (const file of readdirSync(`./Commands/${dir}`)) {
                const module: Command = require(`../Commands/${dir}/${file}`).default;

                this.commands.set(module.structure.name, module);
                this.commandsArray.push(module.structure);

                console.log(`loaded new command: ${file}`)
            }
        }
    };

    public loadEvents() {
        for (const dir of readdirSync('./Events/')) {
            for (const file of readdirSync(`./Events/${dir}`)) {
                require(`../Events/${dir}/${file}`);

                console.log(`Loaded new event: ${file}`);
            };
        };
    };

    public command = class {
        public structure: Command['structure'];
        public run: Command['run'];

        constructor(data: Command) {
            this.structure = data.structure;
            this.run = data.run
        }
    };

    public async deploy() {
        const rest = new REST().setToken(process.env.token ?? '')

        try {
            console.log("[Client] deploying slashcommands... Please wait")
            await rest.put(Routes.applicationCommands(process.env.clientID ?? ''), {
                body: this.commandsArray
            })

            console.log(`[Client]: Deployed with successfully (${this.commandsArray.length} commands loaded)`)
        } catch (error) {
            console.error(error)
        }
    };

    public async start() {
        await this.login(process.env.token)
    }
}
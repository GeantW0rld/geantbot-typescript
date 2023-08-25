import extendedClient from "./Class/extendedClient";
import { config } from "dotenv";
config()

export const client = new extendedClient();

client.start();
client.loadCommands();
client.loadEvents();
client.deploy();

import { SlashCommandBuilder, ContextMenuCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import extendedClient from "../Class/extendedClient";

export interface Command {
    structure: SlashCommandBuilder | ContextMenuCommandBuilder,
    run: (client: extendedClient, interaction: ChatInputCommandInteraction) => void
}
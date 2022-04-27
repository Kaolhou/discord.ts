import { SlashCommandBuilder } from "@discordjs/builders";
import { ClientEvents, CommandInteraction, PermissionResolvable } from "discord.js";
import Bot from "../structures/Bot";

export interface CommandI{
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    exe: (interaction: CommandInteraction, client: Bot)=>unknown
    perms?:PermissionResolvable
}
export interface EventI{
    eventName: string;
    once: boolean;
    run: (client: Bot,...args:ClientEvents[])=>void;
}
export interface findI{
    path: string;
    files: string[];
}
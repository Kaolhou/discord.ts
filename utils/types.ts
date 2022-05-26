import { SlashCommandBuilder } from "@discordjs/builders";
import { ClientEvents, CommandInteraction, PermissionResolvable } from "discord.js";
import Bot from "../structures/Bot";

export interface CommandI{
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    exe: (interaction: CommandInteraction, client: Bot)=>unknown
    perms?:PermissionResolvable
}
export type EventName = keyof ClientEvents;
export const TypedEvent = <T extends EventName>(event: EventI<T>) => event;

export interface EventI<T extends EventName>{
    eventName: T;
    once: boolean;
    run: (client: Bot,...args:ClientEvents[T])=>any;
}
export interface findI{
    path: string;
    files: string[];
}
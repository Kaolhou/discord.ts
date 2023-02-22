import { ChatInputCommandInteraction, ClientEvents, PermissionResolvable, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'
import { Main } from '..'

type eventName = keyof ClientEvents

export interface CommandI{
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">|SlashCommandSubcommandsOnlyBuilder
    exe: (interaction: ChatInputCommandInteraction, client: Main)=>Promise<unknown>|unknown
    acceptDM?:boolean,
    perms?:PermissionResolvable[],
}
export interface EventI<T extends eventName>{
    eventName: T
    exe: (client:Main,...args:ClientEvents[T])=>Promise<void>|void
    once:boolean

}
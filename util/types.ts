import { Client, ClientEvents, CommandInteraction, Interaction, PermissionResolvable, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from 'discord.js'
import { Main } from '..'
import Music from '../structures/Music'

type eventName = keyof ClientEvents
//type 
export interface CommandI{
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">|SlashCommandSubcommandsOnlyBuilder
    exe: (interaction: CommandInteraction, client: Main)=>Promise<unknown>|unknown
    perms?:PermissionResolvable
}
export interface EventI<T extends eventName>{
    eventName: T
    exe: (client:Main,...args:ClientEvents[T])=>Promise<void>|void
    once:boolean

}
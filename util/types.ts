import { Client, ClientEvents, CommandInteraction, Interaction, PermissionResolvable, SlashCommandBuilder } from 'discord.js'
import { Main } from '..'
import Music from '../structures/Music'

type eventName = keyof ClientEvents
//type 
export interface CommandI{
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
    exe: (interaction: CommandInteraction, client: Main)=>unknown
    perms?:PermissionResolvable
    music?:Music
}
export interface EventI<T extends eventName>{
    eventName: T
    exe: (client:Main,...args:ClientEvents[T])=>Promise<void>|void
    once:boolean

}
import { SlashCommandBuilder } from "@discordjs/builders";
import { CommandInteraction, Interaction, PermissionResolvable } from "discord.js";
import Bot from "./Bot";

interface constructorProps{
    data: SlashCommandBuilder,
    perms?: PermissionResolvable,
    exe: (interaction:Interaction,client:Bot)=>any|Promise<any>
}

export class BotCommand {
    constructor({data,perms,exe}:constructorProps){
        
    }
    

}
import { CommandInteraction } from "discord.js";
import { InteractionReplyOptions,InteractionEditReplyOptions } from "discord.js";

type Options = InteractionReplyOptions & InteractionEditReplyOptions
export default async function reply(interaction:CommandInteraction,options:Options){
    if(interaction.deferred){
        await interaction.editReply(options)
        
    }else{
        await interaction.reply(options)
    }
    if(interaction.replied){
        await interaction.followUp(options)
    }
}
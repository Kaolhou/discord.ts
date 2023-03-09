import { CommandInteraction, InteractionDeferReplyOptions } from "discord.js";
import { InteractionReplyOptions,InteractionEditReplyOptions } from "discord.js";

type Options = InteractionReplyOptions & InteractionEditReplyOptions & InteractionDeferReplyOptions
/**
 * Função com o objetivo de responder sem digitar muitas linhas de código
 */
export default async function reply<T extends CommandInteraction>(interaction:T  ,options:Options){
    if(interaction.replied){
        await interaction.followUp(options)
    }else if(interaction.deferred){
        await interaction.editReply(options)
    }else{
        await interaction.reply(options)
    }
}
import { CommandInteraction } from "discord.js";
import { InteractionReplyOptions,InteractionEditReplyOptions } from "discord.js";

type Options = InteractionReplyOptions & InteractionEditReplyOptions
export default function reply(interaction:CommandInteraction,options:Options){
    if(interaction.deferred){
        interaction.editReply(options)
    }else{
        interaction.reply(options)
    }
}
import { Interaction } from "discord.js";
import Bot from "../structures/Bot";
import { runMiddleware } from "../utils/runMiddleware";
import { TypedEvent } from "../utils/types";


export default TypedEvent({
    eventName: 'interactionCreate',
    once: false,
    run: async(client:Bot,interaction:Interaction)=>{
        if (!interaction.inCachedGuild()) return;
        if(interaction.isCommand()){
            const command = client.commands.get(interaction.commandName)
            if(interaction.memberPermissions.has(command?.perms!)){
                interaction.deferReply().then(()=>{
                    command?.exe(interaction,client)
                })
            }else{
                interaction.editReply({
                    content:'você não tem permissão para executar esse comando'
                })
            }
        }
        await runMiddleware(client)
    }
})
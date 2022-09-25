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
            command?.exe(interaction,client)
        }
        await runMiddleware(client)
    }
})
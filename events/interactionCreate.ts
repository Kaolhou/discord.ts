import { Interaction } from "discord.js";
import Bot from "../structures/Bot";
import { runMiddleware } from "../utils/runMiddleware";
import { EventI } from "../utils/types";

const interactionCreate:EventI<any> = {
    eventName:'interactionCreate',
    once:false,
    async run(client:Bot, interaction:Interaction){
        if (!interaction.inCachedGuild()) return;
        if(interaction.isCommand()){
            const command = client.commands.get(interaction.commandName)
            command?.exe(interaction,client)
        }
        await runMiddleware(client)
    }
}
export default interactionCreate
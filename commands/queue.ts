import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import embedQueue from "../util/embedQueue";
import reply from "../util/reply";
import { CommandI } from "../util/types";

//todo adicionar páginas
const pause:CommandI = {
    async exe(interaction, client) {
        if(interaction){
            let connection = client.connections.get(interaction.guildId!)                
            
            connection!.queue.length>=1 ?
            (async function (){
                let embed = embedQueue(connection?.queue)

                await reply(interaction,{
                    embeds:[embed]
                })}
            )() : 
            await reply(interaction,{
                content:'queue is empty'
            })
        }
    },
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('mostra a lista')
    
};
export default pause
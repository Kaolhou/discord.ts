import { SlashCommandBuilder } from "discord.js";
import { embedQueue } from "../util/embeds";
import { CommandI } from "../util/types";

//todo adicionar páginas
const pause:CommandI = {
    async exe(interaction, client) {
        if(interaction){
            let connection = client.connections.get(interaction.guildId!)                
            
            if(connection){
                if(connection.queue.length>=1) {
                    let embed = embedQueue(connection?.queue)
    
                    interaction.editReply({
                        embeds:[embed]
                    })
                }else{
                    await interaction.editReply('queue is empty')
                }
            }else{
                interaction.editReply('no voice connection')
            }
        }
    },
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('mostra a lista')
    
};
export default pause
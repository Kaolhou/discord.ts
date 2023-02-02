import { SlashCommandBuilder } from "discord.js";
import { CommandI } from "../util/types";

const pause:CommandI = {
    async exe(interaction, client) {
        if(interaction){
            let connection = client.connections.get(interaction.guildId!)                
            if(connection){
                connection.pause()
                interaction.editReply(':pause_button:music paused')
                await new Promise(resolve => setTimeout(resolve, 10*1000))
                await interaction.deleteReply()
            }else{
                interaction.editReply('no voice connection')
            }
            
        }
    },
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pausa a música')
    
};
export default pause
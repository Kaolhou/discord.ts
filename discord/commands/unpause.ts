import { SlashCommandBuilder } from "discord.js";
import { CommandI } from "../util/types";

const unpause:CommandI = {
    async exe(interaction, client) {
        if(interaction){
            let connection = client.connections.get(interaction.guildId!)                
            if(connection){
                connection.continue()
                interaction.editReply(':arrow_forward:continue music')
                await new Promise(resolve => setTimeout(resolve, 10*1000))
                await interaction.deleteReply()
            }else{
                interaction.editReply('no voice connection')
            }
        }
    },
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('despausa a música')
    
};
export default unpause
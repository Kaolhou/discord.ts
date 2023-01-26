import { SlashCommandBuilder } from "discord.js";
import reply from "../util/reply";
import { CommandI } from "../util/types";
import music from './play';
//console.log(music)
const unpause:CommandI = {
    async exe(interaction, client) {
        if(interaction){
            music.music?.continue()
            interaction.editReply(':arrow_forward:continue music')
            await new Promise(resolve => setTimeout(resolve, 10*1000))
            await interaction.deleteReply()
        }
    },
    data: new SlashCommandBuilder()
        .setName('unpause')
        .setDescription('despausa a música')
    
};
export default unpause
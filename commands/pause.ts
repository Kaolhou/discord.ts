import { SlashCommandBuilder } from "discord.js";
import Music from "../structures/Music";
import { CommandI } from "../util/types";
import music from './play';
//console.log(music)
const pause:CommandI = {
    async exe(interaction, client) {
        if(interaction){
            music.music?.pause()
            interaction.reply(':pause_button:music paused')
            await new Promise(resolve => setTimeout(resolve, 10*1000))
            interaction.deleteReply()
            
        }
    },
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('pausa a música')
    
};
export default pause
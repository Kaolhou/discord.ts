import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"
import play from './play'
import getSubtitle from '../util/getSubtitle'
import { lyricsQueue } from "../util/embeds"


const lyrics:CommandI = {
    async exe(interaction,client){
        console.log(play.music?.queue.length)
        let queueLenght = play.music?.queue.length
        if(queueLenght&&queueLenght!==0){
            const index = (interaction.options.get('index',false) || 0) as number
            if(play.music?.queue[index]){
                const embed = lyricsQueue(play.music?.queue[index].title,(await getSubtitle(play.music?.queue[index].video_details.url)).map((i)=>i.text))
                interaction.editReply({
                    embeds: [embed]
                })
            }else{
                interaction.editReply('invalid index')
            }
            
        }else{
            interaction.editReply('queue empty')
        }
    },
    data: new SlashCommandBuilder()
        .setName('lyrics')
        .setDescription('search for a music lyrics')
        .addNumberOption(
            option=>option
                .setName('index')
                .setDescription('index of the music')
                .setMinValue(0)
                .setMaxValue(300)
                .setRequired(false)
                        
        )   
}
export default lyrics
import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"
import getSubtitle from '../util/getSubtitle'
import { lyricsQueue } from "../util/embeds"


const lyrics:CommandI = {
    async exe(interaction,client){
        let connection = client.connections.get(interaction.guildId!)                
        if(connection){

            let queueLenght = connection.queue.length
            if(queueLenght&&queueLenght!==0){
                const index = (interaction.options.get('index',false) || 0) as number
                if(connection.queue[index]){
                    const embed = lyricsQueue(connection.queue[index].title,(await getSubtitle(connection.queue[index].video_details.url)).map((i)=>i.text))
                    interaction.editReply({
                        embeds: [embed]
                    })
                }else{
                    interaction.editReply('invalid index')
                }
                
            }else{
                interaction.editReply('queue empty')
            }

        }else{
            interaction.editReply('no voice connection')
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
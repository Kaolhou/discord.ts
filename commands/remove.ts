import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"

const removeFromQueue:CommandI = {
   async exe(interaction,client){
    let index = interaction.options.get('index',true).value as number

    let connection = client.connections.get(interaction.guildId!)                
    if(connection){
        if(connection.queue.length>=1){
            let item = connection.queue.splice(index,1)
            if(item.length){
                interaction.editReply(`\`${item[0].title}\` removed from queue`)
            }else{
                interaction.editReply('no item founded in queue') 
            }
        }else{
            interaction.editReply('queue is empty')
        }

    }else{
        interaction.editReply('no voice connection')
    }
   },
   data: new SlashCommandBuilder()
       .setName('remove')
       .setDescription('remove a item from queue')
       .addIntegerOption(
            option => option
                .setName('index')
                .setDescription('index of queue to remove')
                .setRequired(true)
                .setMinValue(0)
                .setMaxValue(300)
       )
}
export default removeFromQueue
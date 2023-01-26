import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"

const removeFromQueue:CommandI = {
   async exe(interaction,client){
    let index = interaction.options.get('index',true).value as number

    client.connections.get(interaction.guildId!)!.queue.length>=1 ?
    (async function (){
        let item = client.connections.get(interaction.guildId!)?.queue.splice(index,1)
        if(item?.length){
            interaction.editReply(`\`${item[0].title}\` removed from queue`)
        }else{
            interaction.editReply('no item founded in queue') 
        }
    })() : 
    interaction.editReply('queue is empty')
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
import { SlashCommandBuilder } from "discord.js"
import reply from "../util/reply"
import { CommandI } from "../util/types"

const removeFromQueue:CommandI = {
   async exe(interaction,client){
    let index = interaction.options.get('index',true).value as number

    client.connections.get(interaction.guildId!)!.queue.length>=1 ?
    (async function (){
        let item = client.connections.get(interaction.guildId!)?.queue.splice(index,1)
        if(item?.length){
            await reply(interaction,{
                content:`\`${item[0].title}\` removed from queue`
            })
        }else{
            await reply(interaction,{
                content:'no item founded in queue'
            }) 
        }
    })() : 
    await reply(interaction,{
        content:'queue is empty'
    })
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
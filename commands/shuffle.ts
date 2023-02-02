import { SlashCommandBuilder } from "discord.js"
import { embedQueue } from "../util/embeds"
import { CommandI } from "../util/types"

const shuffle:CommandI = {
    async exe(interaction,client){
        let connection = client.connections.get(interaction.guildId!)
        if(connection){
            if(connection.queue.length>=1){

                let item = connection.queue.shift()
                connection.queue.sort( () => .5 - Math.random() );
                connection.queue.unshift(item!)
    
                let embed = embedQueue(connection.queue)
                
                interaction.editReply({
                    content:'queue shuffled, here is the new queue',
                    embeds:[embed]
                })
            }else{
                interaction.editReply('queue empty')
            }
        }else{
            interaction.editReply('no voice connection')
        }

    },
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('shuffle the queue')
}
export default shuffle
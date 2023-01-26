import { SlashCommandBuilder } from "discord.js"
import { embedQueue } from "../util/embeds"
import { CommandI } from "../util/types"
import play from './play'

const shuffle:CommandI = {
    async exe(interaction,client){
        if(play.music?.queue.length!>=1){

            let item = play.music?.queue.shift()
            play.music?.queue.sort( () => .5 - Math.random() );
            play.music?.queue.unshift(item!)

            let embed = embedQueue(play.music?.queue)
            
            interaction.editReply({
                content:'queue shuffled, here is the new queue',
                embeds:[embed]
            })
        }else{
            interaction.editReply('queue empty')
        }

    },
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('shuffle the queue')
}
export default shuffle
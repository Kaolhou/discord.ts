import { EmbedBuilder } from "@discordjs/builders"
import { SlashCommandBuilder } from "discord.js"
import embedQueue from "../util/embedQueue"
import reply from "../util/reply"
import { CommandI } from "../util/types"
import play from './play'

const shuffle:CommandI = {
    async exe(interaction,client){
        if(play.music?.queue.length!>=1){

            let item = play.music?.queue.shift()
            play.music?.queue.sort( () => .5 - Math.random() );
            play.music?.queue.unshift(item!)

            let embed = embedQueue(play.music?.queue)
            
            reply(interaction,{
                content:'queue shuffled, here is the new queue',
                embeds:[embed]
            })
        }else{
            reply(interaction,{
                content:'queue empty'
            })
        }

    },
    data: new SlashCommandBuilder()
        .setName('shuffle')
        .setDescription('shuffle the queue')
}
export default shuffle
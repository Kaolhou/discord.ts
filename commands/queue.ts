import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandI } from "../util/types";
import music from './play';

const pause:CommandI = {
    async exe(interaction, client) {
        if(interaction){
            let embed = new EmbedBuilder()
                .setTitle('Queue')
                
            // let str = ''
            // console.log(client.connections.get(interaction.guildId!)?.queue)
            client.connections.get(interaction.guildId!)?.queue.forEach((i,index)=>{
                embed.addFields({name:`[${index+1}] - ${i.title}`, value:i.link}) 
            })
            interaction.reply({embeds:[embed]})
            // console.log(str)
            // interaction.reply(str)

        }
    },
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('mostra a lista')
    
};
export default pause
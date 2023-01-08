import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import reply from "../util/reply";
import { CommandI } from "../util/types";
import music from './play';

const pause:CommandI = {
    async exe(interaction, client) {
        if(interaction){

            let embed = new EmbedBuilder()
                .setTitle('Queue')
                client.connections.get(interaction.guildId!)?.queue.forEach((i,index)=>{
                embed.addFields({name:`[${index+1}] - ${i.title}`, value:i.link}) 
            })

            await reply(interaction,{
                embeds:[embed]
            })
        }
    },
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('mostra a lista')
    
};
export default pause
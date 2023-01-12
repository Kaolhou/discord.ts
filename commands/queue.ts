import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import reply from "../util/reply";
import { CommandI } from "../util/types";

//todo adicionar páginas
const pause:CommandI = {
    async exe(interaction, client) {
        if(interaction){
            let connection = client.connections.get(interaction.guildId!)
            let embed = new EmbedBuilder()
                .setTitle('Queue')

                connection!.queue.length>=1 ?
            (async function (){
                connection?.queue.forEach((i,index)=>{
                    if(index==0){
                        embed.addFields({name:`\`now playing\` ${i.title.length>=40?i.title.substring(0,40)+'...':i.title}`, value:i.link})
                    }else{
                        embed.addFields({name:`[${index}] - ${i.title.length>=45?i.title.substring(0,45)+'...':i.title}`, value:i.link})
                    }
                })
                await reply(interaction,{
                    embeds:[embed]
                })}
            )() : 
            await reply(interaction,{
                content:'queue is empty'
            })
        }
    },
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('mostra a lista')
    
};
export default pause
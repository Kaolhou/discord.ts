import { EmbedBuilder } from "@discordjs/builders";
import { SoundOptions } from "../structures/Music";

export function embedQueue(queue:SoundOptions[]|undefined){
    const embed = new EmbedBuilder()
        .setTitle('Queue')

    if(queue!==undefined){
        queue.forEach((i,index)=>{
            if(index==0){
                embed.addFields({name:`\`now playing\` ${i.title.length>=40?i.title.substring(0,40)+'...':i.title}`, value:i.link})
            }else{
                embed.addFields({name:`[${index}] - ${i.title.length>=45?i.title.substring(0,45)+'...':i.title}`, value:i.link})
            }
        })
    }
    return embed
}
export function lyricsQueue(title:string,lines:string[]){
    const embed = new EmbedBuilder()
        .setTitle(title)
    let content = ''
    lines.forEach((i)=>{
        content+=i+'\n'
    })
    embed.setDescription(content)
    return embed
}
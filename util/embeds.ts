import { EmbedBuilder } from "@discordjs/builders";
import { SoundOptions } from "../structures/Music";
import { UserI } from "../structures/Uno";
import titleParse from "./titleParse";

export function embedQueue(queue:SoundOptions[]|undefined){
    const embed = new EmbedBuilder()
        .setTitle('Queue')

    if(queue!==undefined){
        queue.forEach((i,index)=>{
            if(index==0){
                embed.addFields({name:`\`now playing\` ${titleParse(i.title)}`, value:i.link})
            }else{
                embed.addFields({name:`[${index}] - ${titleParse(i.title)}`, value:i.link})
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

interface UnoOptions{
    player:UserI
}
export function unoEmbedPrivate({player}:UnoOptions){
    const embed = new EmbedBuilder()
        .setTitle(player.username)
        .setFooter({text:'seu baralho'})
            
    return embed
}
export function unoEmbedPlayers(user:UserI[]){
    const embed = new EmbedBuilder()
        .setTitle('Uno')
    user.forEach(i=>{
        embed.addFields({
            name:i.username,
            value:`${i.deck.length.toString()} cartas`
        })
    })

    return embed
}
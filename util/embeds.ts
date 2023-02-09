import { EmbedBuilder } from "@discordjs/builders";
import { SoundOptions } from "../structures/Music";
import { cards, UserI } from "../structures/Uno";
import titleParse from "./titleParse";
import cardsUrl from '../cards.json'

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
    users: UserI[]
    currentCard:cards
    possiblePlays:(cards|'buy')[]
    yourTurn:boolean
}
export function unoEmbedPrivate({
    player,
    users,
    currentCard,
    possiblePlays,
    yourTurn
}:UnoOptions){
    const embed = new EmbedBuilder()
        .setTitle(player.username)
    
    if(yourTurn){
        embed.setFooter({text:'Sua vez'})
    }

    let plays = ''
    possiblePlays.forEach((i,index)=>{
        if(index+1===possiblePlays.length){
            plays+=`${i}`
        }else{
            plays+=`${i}, `
        }
    })
    embed.setDescription(`Jogadas possíveis: ${plays}`)

    users.forEach(i=>{
        embed.addFields({
            name:i.username,
            value:`${i.deck.length.toString()} cartas`
        })
    })
    
    embed.setThumbnail(cardsUrl[currentCard])
    
    return embed
}
export function unoEmbedPlayers(user:UserI[],currentCard:cards){
    const embed = new EmbedBuilder()
        .setTitle('Uno')
    user.forEach(i=>{
        embed.addFields({
            name:i.username,
            value:`${i.deck.length.toString()} cartas`
        })
    })
    embed.setThumbnail(cardsUrl[currentCard])

    return embed
}
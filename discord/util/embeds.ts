import { EmbedBuilder } from "@discordjs/builders";
import { SoundOptions } from "../structures/Music";
import { cards, infoCard, UserI } from "../structures/Uno";
import titleParse from "./titleParse";
const cardsUrl ={
    "00":"https://i.imgur.com/osBTa5O.png",
    "0b":"https://i.imgur.com/APG1icX.png",
    "0g":"https://i.imgur.com/dPKoWIY.png",
    "0r":"https://i.imgur.com/JJBSwjv.png",
    "0y":"https://i.imgur.com/NDvNcNm.png",
    "1b":"https://i.imgur.com/5epOU3Z.png",
    "1g":"https://i.imgur.com/n086BvF.png",
    "1r":"https://i.imgur.com/qHIEYE3.png",
    "1y":"https://i.imgur.com/3zSbudh.png",
    "2b":"https://i.imgur.com/JceA9JT.png",
    "2g":"https://i.imgur.com/R3QpQCX.png",
    "2r":"https://i.imgur.com/rjxbpoi.png",
    "2y":"https://i.imgur.com/8TsDmhX.png",
    "3b":"https://i.imgur.com/dRdiAAN.png",
    "3g":"https://i.imgur.com/Fuy4J86.png",
    "3r":"https://i.imgur.com/A2gSDYD.png",
    "3y":"https://i.imgur.com/DfydYb6.png",
    "4b":"https://i.imgur.com/UwkD5jX.png",
    "4g":"https://i.imgur.com/nWKdryJ.png",
    "4r":"https://i.imgur.com/Xgbunn6.png",
    "4y":"https://i.imgur.com/jdXfxbH.png",
    "5b":"https://i.imgur.com/EZ40y3j.png",
    "5g":"https://i.imgur.com/ZAZjN8w.png",
    "5r":"https://i.imgur.com/8ivSuu9.png",
    "5y":"https://i.imgur.com/kl63O2s.png",
    "6b":"https://i.imgur.com/vHgQcef.png",
    "6g":"https://i.imgur.com/KyOBOoY.png",
    "6r":"https://i.imgur.com/KJSRIms.png",
    "6y":"https://i.imgur.com/JClhGMt.png",
    "7b":"https://i.imgur.com/twPdX6U.png",
    "7g":"https://i.imgur.com/KUwGJY1.png",
    "7r":"https://i.imgur.com/4B1nhJk.png",
    "7y":"https://i.imgur.com/s9YXS4R.png",
    "8b":"https://i.imgur.com/jdjAT9a.png",
    "8g":"https://i.imgur.com/F899ywy.png",
    "8r":"https://i.imgur.com/guYIwpg.png",
    "8y":"https://i.imgur.com/zDD364G.png",
    "9b":"https://i.imgur.com/lXgY5w3.png",
    "9g":"https://i.imgur.com/iilkq15.png",
    "9r":"https://i.imgur.com/p5ugQMo.png",
    "9y":"https://i.imgur.com/UVkzbRs.png",
    "blockb":"https://i.imgur.com/EOOEVgx.png",
    "blockg":"https://i.imgur.com/LjDEqbI.png",
    "blockr":"https://i.imgur.com/sdTAHXy.png",
    "blocky":"https://i.imgur.com/JaAct4a.png",
    "color":"https://i.imgur.com/DwALbuc.png",
    "color4":"https://i.imgur.com/2aYrscO.png",
    "plus2b":"https://i.imgur.com/os1Vql4.png",
    "plus2g":"https://i.imgur.com/dupionl.png",
    "plus2r":"https://i.imgur.com/TkprdbY.png",
    "plus2y":"https://i.imgur.com/GSmiGsE.png",
    "revey":"https://i.imgur.com/avMdbEz.png",
    "reveb":"https://i.imgur.com/FkHE6uX.png",
    "reveg":"https://i.imgur.com/5O1coep.png",
    "rever":"https://i.imgur.com/DPFzqPJ.png"
}

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
    color?:Exclude<infoCard['color'],'black'>
}
export function unoEmbedPrivate({
    player,
    users,
    currentCard,
    possiblePlays,
    yourTurn,
    color
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
    if(color){
        embed.addFields(
            { name: 'Cor escolhida:', value: color },
            { name: '\u200B', value: '\u200B' },
        )
    }
    embed.addFields({
        name:"jogadas possíveis:",
        value:plays
    })

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
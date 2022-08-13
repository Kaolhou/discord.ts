import { prisma } from "../prisma/prisma";
import { findArr } from "../utils/files";
import { randomize } from "../utils/randomize";
import { Client, MessageAttachment } from "discord.js";
import { isSameDay } from "../utils/isSameDay";
import path from 'path'

export async function memePerDay(client:Client){
    const today = new Date()
    const dbtoday = await prisma.date.findFirst({
        orderBy:{
            today:'desc'
        }
    })
    const memes = findArr(path.resolve(process.env!.PATH_MEMES!));
    const x = randomize(memes);
    const attachment = new MessageAttachment(x,x);
    (!dbtoday || !isSameDay(today,new Date(dbtoday.today))) ? (async()=>{
        //verificar nomes repetidos
        try {
            if(!(await prisma.date.findFirst({
                where: {
                    meme: x.split('\\').slice(-1)[0]
                }
            }))){
                await prisma.date.create({
                    data:{
                        meme: x.split('\\').slice(-1)[0],
                        today: today.toString()
                    }
                })

                // const channel = member.guild.channels.cache.find(ch => ch.name === 'YOUR CHANNEL NAME HERE');
                const channel = client.channels.cache.find(ch => ch.id === process.env!.CHANNEL_MEMES!)
                channel?.isText() && channel.send({
                    files: [attachment]
                })
                
            }else{
                //se chegou aqui é porque o meme é repetido, e fazendo isso ela se auto-chama para pegar o meme não repetido
                memePerDay(client)
                // console.log('meme repetido corno')
                // throw new Error('meme repetido ou problema no db')
            }
        } catch (error) {
            console.error(error)
        }
        
    })(): console.log('nn faz nada') // se chega aqui é pq ja mandou meme hj
}
import { prisma } from "../prisma/prisma";
import { randomizeMemes } from "../utils/randomize";
import { Client } from "discord.js";
import { isSameDay } from "../utils/isSameDay";
import { SendMeme } from "./sendMeme";

export async function memePerDay(client:Client){

    const today = new Date()
    const dbtoday = await prisma.date.findFirst({
        orderBy:{
            today:'desc'
        }
    })
    const dbmemes = await prisma.memes.findMany({
        where:{
            send: false
        }
    })

    let selectedMeme = randomizeMemes(dbmemes);
    
    (!dbtoday || !isSameDay(today,new Date(dbtoday.today.toString()))) ? (async()=>{ 
        try {
            /* função executada quando não há registro de memes enviados diários e quando as datas do
                banco de dados e de hoje sejam diferentes
            */
            // mesmo dia / sem registros

            if(!dbtoday){
                if((await prisma.date.create({
                    data:{
                        meme: selectedMeme.name
                    }
                }))&&
                (await prisma.memes.update({
                    where:{
                        id: selectedMeme.id
                    },
                    data:{
                        send:true
                    }
                }))){
                    SendMeme(client,selectedMeme)
                    console.log('enviou')
                }
                console.log('nada de meme no db, alterando')   
            }
            if(dbtoday && !isSameDay(today,new Date(dbtoday.today.toString()))){
                await prisma.date.create({
                    data:{
                        meme: selectedMeme.name,
                    }
                })
                await prisma.memes.update({
                    where:{
                        id: selectedMeme.id
                    },
                    data:{
                        send:true
                    }
                })

                SendMeme(client,selectedMeme)
               
                console.log('dia diferente')
            }
            
            // if((await prisma.date.findFirst({
            //     where: {
            //         meme: selectedMeme.name
            //     }
            // }))){
            //     console.log(x)
            // }else{

            // }


            // if(!(await prisma.date.findFirst({
            //     where: {
            //         meme: selectedMeme.name.split('\\').slice(-1)[0]
            //     }
            // }))){
            //     await prisma.date.create({
            //         data:{
            //             meme: selectedMeme.name.split('\\').slice(-1)[0],
            //             today: today.toString()
            //         }
            //     })
            //     await prisma.memes.update({
            //         where:{
            //             id: selectedMeme.id
            //         },
            //         data:{
            //             send:true
            //         }
            //     })

            //     // const channel = member.guild.channels.cache.find(ch => ch.name === 'YOUR CHANNEL NAME HERE');
            //     const channel = client.channels.cache.find(ch => ch.id === process.env!.CHANNEL_MEMES!)
            //     channel?.isText() && channel.send({
            //         files: [attachment]
            //     })
            //     console.log('meme enviado')
            // }else{
            //     //se chegou aqui é porque o meme é repetido, e fazendo isso ela se auto-chama para pegar o meme não repetido
            //     memePerDay(client)
            //     // console.log('meme repetido corno')
            //     // throw new Error('meme repetido ou problema no db')
            // }
        } catch (error) {
            console.error(error)
            throw new Error()
        }
    })(): console.log('nn faz nada') // se chega aqui é pq ja mandou meme hj
}
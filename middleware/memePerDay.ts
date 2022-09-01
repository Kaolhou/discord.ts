import { prisma } from "../prisma/prisma";
import { randomize } from "../utils/randomize";
import { Client } from "discord.js";
import { isSameDay } from "../utils/isSameDay";
import { SendMeme } from "../utils/sendMeme";

export default async function memePerDay(client:Client){

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

    let selectedMeme = randomize(dbmemes);
    
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
                    await SendMeme(client,selectedMeme)
                    console.log('enviou')
                }
                console.log('nada de meme no db, alterando')
            }
            if(dbtoday && !isSameDay(today,new Date(dbtoday.today.toString()))){
                // console.log(dbtoday,!isSameDay(today,new Date(dbtoday.today.toString())))
                await SendMeme(client,selectedMeme)
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

               
                console.log('dia diferente')
            }
        } catch (error) {
            console.error(error)
            process.exit(1)
        }
    })(): console.log('nn faz nada') // se chega aqui é pq ja mandou meme hj
}
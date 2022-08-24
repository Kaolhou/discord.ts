import { Memes } from "@prisma/client";
import { Client } from "discord.js";
import { prisma } from "../prisma/prisma";
import { randomizeMemes } from "./randomize";
import path from 'path'

export async function SendMeme(client:Client, file? :Memes){
    try {
        if(!file){
            const dbmemes = await prisma.memes.findMany({
                where:{
                    send: false
                }
            })
            file = randomizeMemes(dbmemes);
        }
        const channel = client.channels.cache.find(ch => ch.id === process.env!.CHANNEL_MEMES!)
        channel?.isText() && channel.send({
            files: [{
                attachment: path.resolve(process.env!.PATH_MEMES!, file.name),
                name: file.name
            }]
        })
        console.log('meme enviado')
        
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
import { Memes } from "@prisma/client";
import { Client } from "discord.js";
import { prisma } from "../prisma/prisma";
import { randomize } from "./randomize";
import path from 'path'
import fs from 'fs'

export async function SendMeme(client:Client, file? :Memes){
    try {
        if(!file){
            const dbmemes = await prisma.memes.findMany({
                where:{
                    send: false,
                    nsfw: false
                }
            })
            file = randomize(dbmemes);
        }
        var jsobj:string[]=[]
        let data = fs.readFileSync('chats.conf','utf-8')
        JSON.parse(data).forEach((el:string) => {
            jsobj.push(el)
        })
                        
        for(let i=0;i<jsobj.length;i++){
            const channel = client.channels?.cache.find(ch => ch.id === jsobj[i])
            channel?.isText() && await channel.send({
                files: [{
                    attachment: path.resolve(process.env!.PATH_MEMES!, file.name),
                    name: file.name.endsWith('.jfif')?file.name.slice(0,-5).concat('.jpeg'):file.name
                }]
            })
        }
        console.log('meme enviado')
        
        
    } catch (error) {
        console.error(error)
        throw new Error()
    }
}
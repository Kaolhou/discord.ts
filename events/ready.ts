import Bot from "../structures/Bot";
import { commandFiles, findArr } from "../utils/files";
import { CommandI, EventI } from "../utils/types";
import { REST } from '@discordjs/rest'
import { Routes } from "discord-api-types/v10";
import { prisma } from "../prisma/prisma";
import path from 'path'
import util from 'util'
import { memePerDay } from "../import/memePerDay";
import { refreshDb } from "../import/refreshDb";


const ready:EventI<any> = {
    eventName:'ready',
    once:true,
    async run(client:Bot){
        const commandArr: Array<any> = [];
        await Promise.all(commandFiles!.files!.map(async (file)=>{
            const command:CommandI = (await import(commandFiles.path+'\\'+file)).default;
            if (!command) {
                console.error(
                    `File at path ${file} seems to incorrectly be exporting an event.`
                );
            }
            client.commands.set(command.data.name, command)

            var imports:Array<any> = []
            imports.push(command)
            imports.map((i)=>{
                commandArr.push(i.data.toJSON())
            })

            //nome auto-explicativo
            await refreshDb()

            //this will put a meme in meme channel 1 time per day
            await memePerDay(client)

            const rest = new REST({ version: "9" }).setToken(process!.env!.TOKEN!);

            rest.put(Routes.applicationGuildCommands(process!.env!.CLIENT_ID!, process!.env!.GUILD_ID!),{ body: commandArr })
            .then(()=>{console.log('commands loaded')})
            .catch((err)=>{console.log(err)})
        }))
        console.log('bot started')
    }
}
export default ready
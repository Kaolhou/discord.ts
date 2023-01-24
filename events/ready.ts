import { ActivityType, Routes } from "discord.js";
import {REST} from '@discordjs/rest'
import { CommandI, EventI } from "../util/types"
import { commands } from "../util/find";
import { config } from "dotenv";config()
import path from 'path'
import { Main } from "..";
import { ImportError } from "../structures/Errors";

/**
 * Evento responsável por toda a inicialização do bot, ele importa todos os commandos,
 * faz uma requisição REST de protocolo PUT para enviar os slash commands para o discord e 
 * coloca todos os comandos para dentro do client
 */
const ready:EventI<'ready'> = {
    eventName:'ready',
    async exe(client:Main) {
        const commandArr: Array<CommandI> = [];

        const rest = new REST({ version: "9" }).setToken(process!.env!.TOKEN!);

        await Promise.all(commands.map(async (file)=>{
            
            try {
                if(__filename.endsWith('.ts')){
                    var command = (await import("file://"+path.resolve(__dirname,'..','commands',file))).default as CommandI;
                }else{
                    var command = (await import(path.resolve(__dirname,'..','commands',file))).default as CommandI;
                }            
            } catch (error) {
                console.log(error)
                throw new ImportError('Import Error')
            }
            if (!command) {
                console.error(
                    `File at path ${file} seems to incorrectly be exporting an event.`
                );
            }

            client.commands.set(command.data.name, command)

            var imports: Array<any> = [];
            client.verbose ? console.log(`\x1b[33m%s\x1b[0m`,`[commands] ${command.data.name} loaded`) : null
            imports.push(command);
            imports.map((i) => {
                commandArr.push(i.data.toJSON());
            });
        }))
        /**
         * substitua applicationCommands por applicationGuildCommands e retire o
         * comentário da variavel de ambiente para adicionar comandos em um único servidor
         */
        rest
            .put(
            Routes.applicationCommands(
                process!.env!.CLIENT_ID! /*, process!.env!.GUILD_ID!*/
            ),
            { body: commandArr }
            )
            .then(() => {
                console.log(`\x1b[32m%s\x1b[0m`,`[commands] all commands loaded and submitted to discord`)
                //console.log("commands loaded");
            })
            .catch((err) => {
                throw new Error(err);
            })
            console.log(`\x1b[32m%s\x1b[0m`,`[ready] bot started`)
            while(true){
                client.user?.setPresence({
                    activities:[{
                        name:'/help',
                        type:ActivityType.Playing
                    }]
                })
                await new Promise(resolve => setTimeout(resolve, 1000*35))
                client.verbose ? console.log(`[websocket] ping: ${client.ws.ping}`) : null
            }
            // console.log("bot started")
    },
    once:true
}

export default ready
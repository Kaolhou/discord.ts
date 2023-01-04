import { Routes } from "discord.js";
import {REST} from '@discordjs/rest'
import { CommandI, EventI } from "../util/types"
import { commands } from "../util/find";
import { config } from "dotenv";config()
import path from 'path'
import { Main } from "..";

const ready:EventI<'ready'> = {
    eventName:'ready',
    async exe(client:Main) {
        const commandArr: Array<CommandI> = [];

        const rest = new REST({ version: "9" }).setToken(process!.env!.TOKEN!);

        await Promise.all(commands.map(async (file)=>{
            const command = (await import(path.resolve(__dirname,'..','commands',file))).default as CommandI;
            //console.log(command)
            if (!command) {
                console.error(
                    `File at path ${file} seems to incorrectly be exporting an event.`
                );
            }

            client.commands.set(command.data.name, command)

            var imports: Array<any> = [];

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
                console.log("commands loaded");
            })
            .catch((err) => {
                throw new Error(err);
            })
        console.log("bot started")
    },
    once:true
}

export default ready
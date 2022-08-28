import Bot from "../structures/Bot";
import { commandFiles } from "../utils/files";
import { CommandI, EventI } from "../utils/types";
import { REST } from '@discordjs/rest'
import { Routes } from "discord-api-types/v10";
import { runMiddleware } from "../utils/runMiddleware";

const ready:EventI<any> = {
    eventName:'ready',
    once:true,
    async run(client:Bot){
        try {
            const commandArr: Array<CommandI> = [];
            client.user?.setActivity({
                type: 'PLAYING',
                name:'/help'
            })
            
            //* never put the middleware files into the Promise All, this will 
            //* make the middleware execute a lot of times
            await runMiddleware()

            await Promise.all(commandFiles!.files!.map(async (file)=>{
                const command:CommandI = (await import(commandFiles.path+'\\'+file)).default;
                if (!command) {
                    throw new Error(`File at path ${file} seems to incorrectly be exporting an event.`)
                }
                client.commands.set(command.data.name, command)

                var imports:Array<any> = []
                imports.push(command)
                imports.map((i)=>{
                    commandArr.push(i.data.toJSON())
                })          
            }))

            const rest = new REST({ version: "9" }).setToken(process!.env!.TOKEN!);

            /**
             * substitua applicationCommands por applicationGuildCommands e retire o
             * comentário da variavel de ambiente para adicionar comandos em um único servidor
             */
            rest.put(Routes.applicationCommands(process!.env!.CLIENT_ID!/*, process!.env!.GUILD_ID!*/),{ body: commandArr })
                .then(()=>{console.log('commands loaded')})
                .catch((err)=>{throw new Error(err)})
            console.log('\x1b[32m%s\x1b[0m',`Bot started`)
        } catch (error) {
            console.error(error)
        }
    }
}
export default ready
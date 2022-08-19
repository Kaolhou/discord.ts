import Bot from "../structures/Bot";
import { commandFiles, findArr } from "../utils/files";
import { CommandI, EventI } from "../utils/types";
import { REST } from '@discordjs/rest'
import { Routes } from "discord-api-types/v10";
import { memePerDay } from "../middleware/memePerDay";
import { refreshDb } from "../middleware/refreshDb";


const ready:EventI<any> = {
    eventName:'ready',
    once:true,
    async run(client:Bot){
        const commandArr: Array<CommandI> = [];
        //nome auto-explicativo
        await refreshDb()

        //this will put a meme in meme channel 1 time per day
        await memePerDay(client)
        //* never put the middleware files into the Promise All, this will 
        //* make the middleware execute a lot of times
        //todo a function that import all middlewares automatically

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
            

            const rest = new REST({ version: "9" }).setToken(process!.env!.TOKEN!);

            rest.put(Routes.applicationGuildCommands(process!.env!.CLIENT_ID!, process!.env!.GUILD_ID!),{ body: commandArr })
            .then(()=>{console.log('commands loaded')})
            .catch((err)=>{console.log(err)})
        }))
        console.log('bot started')
    }
}
export default ready
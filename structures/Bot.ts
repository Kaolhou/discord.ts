import { config } from "dotenv"; config()
import { Client, ClientOptions, Collection } from 'discord.js'
import { CommandI, EventI } from "../utils/types";
import ping from "../commands/ping";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v10";
import { eventFiles } from "../utils/files";


class Bot extends Client{
    commands = new Collection<string[], CommandI>()

    constructor(options:ClientOptions){
        super(options)
        this.loadEvents()
    }

    start(){
        this.loadfiles()
        this.login(process.env!.TOKEN!)
    }
    private async loadEvents(){
        await Promise.all(eventFiles!.files!.map(async (file)=>{
            const event = (await import(eventFiles.path+'\\'+file)).default as EventI;
            if (!event) {
                console.error(
                    `File at path ${file} seems to incorrectly be exporting an event.`
                );
            }
            if (event.once)
                this.once(event.eventName, event.run.bind(null, this));
                
            else this.on(event.eventName, event.run.bind(null, this));
        }))
    }
    loadfiles(){
        const commandArr: Array<any> = [];
        var imports = [ping] //TODO subsituir por um laço de repetição q importa todos os comandos

        imports.map((i)=>{
            commandArr.push(i.data.toJSON())
        })
        const rest = new REST({ version: "9" }).setToken(process!.env!.TOKEN!);

        rest.put(Routes.applicationGuildCommands(process!.env!.CLIENT_ID!, process!.env!.GUILD_ID!),{ body: commandArr })
        .then(()=>{console.log('commands loaded')})
        .catch((err)=>{console.log(err)})
    }
}

export default Bot
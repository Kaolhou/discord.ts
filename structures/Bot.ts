import { config } from "dotenv"; config()
import { Client, ClientOptions, Collection } from 'discord.js'
import { CommandI, EventI } from "../utils/types";
import { eventFiles } from "../utils/files";


class Bot extends Client{
    commands = new Collection<string, CommandI>()

    constructor(options:ClientOptions){
        super(options)
        this.loadEvents().then(()=>{
            this.login(process.env!.TOKEN!)
        })
    }

    /*start(){
        
    }*/
    private async loadEvents(){
        await Promise.all(eventFiles!.files!.map(async (file)=>{
            const event = (await import(eventFiles.path+'\\'+file)).default as EventI<any>;
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
}

export default Bot
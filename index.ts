import { Client, ClientOptions, Collection, Interaction, Partials } from "discord.js";
import { events } from "./util/find";
import { CommandI, EventI } from "./util/types";
import { config } from "dotenv";
import Music from "./structures/Music";
config()
export class Main extends Client{
    commands = new Collection<string, CommandI>() //commands array
    connections = new Collection<string, Music>() //voice connections array
    
    constructor(options:ClientOptions){
        super(options)
        this.loadEvents()
        this.login(process.env!.TOKEN!)
    }
    
    public async loadEvents(){
        
        await Promise.all(events.map(async (file)=>{
            const event = (await import(__dirname+'\\'+'events'+'\\'+file)).default as EventI<any>;
            if (!event) {
                console.error(
                    `File at path ${file} seems to incorrectly be exporting an event.`
                    );
                }
                if (event.once)
                this.once(event.eventName, event.exe.bind(null, this));
                
                else this.on(event.eventName, event.exe.bind(null, this));
        }))
    }

    

}

new Main({

    intents:[
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
        "GuildVoiceStates"
    ],
    partials:[Partials.Message, Partials.Channel, Partials.Reaction]
})
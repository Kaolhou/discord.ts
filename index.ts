import { Client, ClientOptions, Collection, Interaction, Partials } from "discord.js";
import { events } from "./util/find";
import { CommandI, EventI } from "./util/types";
import { config } from "dotenv";
import Music from "./structures/Music";
import { PrismaClient } from "@prisma/client";
config()
export class Main extends Client{
    commands = new Collection<string, CommandI>() //commands array
    connections = new Collection<string, Music>() //voice connections array
    prisma = new PrismaClient()
    administrators = this.loadAdm() 
    
    constructor(options:ClientOptions){
        super(options)
        this.loadAdm()
        this.loadEvents()
        this.login(process.env!.TOKEN!)
    }
    /**
     * Função responsável por automáticamente importar os eventos disponíveis na pasta `events`, todos
     * os arquivos devem **retornar** como **default** um objeto que siga o tipo `EventI<T>` disponibilizado em
     * `utils/types.ts`
     */
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
    /**
     * Função que carrega os administradores do bot recebidos pelo arquivo `.env`
     * e adiciona no na classe disponível no client.
     */
    private loadAdm():string[]{
        if(process.env!.ADMS!){
            //the format should be like this
            //'["adm1ID","adm2ID"]'
            return JSON.parse(process.env!.ADMS!)
        }else{
            throw new Error('no administrators were provided')
        }
        
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
import { Client, ClientOptions, Collection, Partials } from "discord.js";
import { events } from "./util/find";
import { CommandI, EventI } from "./util/types";
import { config } from "dotenv";
import Music from "./structures/Music";
import { PrismaClient } from "@prisma/client";
import { ImportError, NoEventsProvided } from "./structures/Errors";
import path from 'path'
config()
interface MainOptions extends ClientOptions{
    verbose?:boolean
}
export class Main extends Client{
    commands = new Collection<string, CommandI>() //commands array
    connections = new Collection<string, Music>() //voice connections array
    prisma = new PrismaClient()                   //database
    administrators = this.loadAdm() 
    verbose = false
    
    constructor(options:MainOptions){
        super(options)
        this.verbose = Boolean(options.verbose)
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
        if(events.length==0){
            throw new NoEventsProvided(
                `No event files were provided at
                ${__dirname+__filename},
                please check your events folder`
            )
        }
        await Promise.all(events.map(async (file)=>{
            try {
                if(__filename.endsWith('.ts')){
                    var event = (await import("file://"+path.resolve(__dirname,'events',file))).default as EventI<any>;
                }else{
                    var event = (await import(path.resolve(__dirname,'events',file))).default as EventI<any>;
                }
            } catch (error) {
                throw new ImportError('Import Error')
            }
            if (!event) {
                console.error(
                    "\x1b[30m%s\x1b[0m",
                    `File at path ${file} seems to incorrectly be exporting an event.`
                );
            }
            if (event.once)
                this.once(event.eventName, event.exe.bind(null, this));
                
            else this.on(event.eventName, event.exe.bind(null, this));
            this.verbose ? console.log(`\x1b[33m%s\x1b[0m`,`[events] ${event.eventName} loaded`) : null
        }))
        console.log(`\x1b[32m%s\x1b[0m`,`[events] all events loaded`)
    }
    /**
     * Função que carrega os administradores do bot recebidos pelo arquivo `.env`
     * e adiciona no na classe disponível no client.
     */
    private loadAdm():string[]|undefined{
        return process.env!.ADMS! ? JSON.parse(process.env!.ADMS!) : undefined
    }
}

new Main({
    verbose: process.argv[2]=='-verbose',
    intents:[
        "Guilds",
        "GuildMessages",
        "GuildMessageReactions",
        "GuildVoiceStates",
        "DirectMessages",
        'DirectMessageReactions'
    ],
    partials:[Partials.Message, Partials.Channel, Partials.Reaction,Partials.Channel]
})
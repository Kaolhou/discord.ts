import { Client, Intents } from "discord.js";
import { config } from 'dotenv'
config()
import command from '../commands/index'
const intents = [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES ]

export default class Bot{
    public static client:Client
    constructor(private token:string){
        Bot.client = new Client({intents})
        Bot.client.on("messageCreate", (message):void=> {
            if(!message.content.startsWith(process.env.PREFIX!))return
            if(message.author.bot) return
            const msg:string = message.content.slice(process.env.PREFIX!.length)
            const cmd:string = msg.split(' ')[0].toLocaleLowerCase()
            const args:string = msg.split(' ').slice(1).toString()
            const x = command.filter(item=>item.name === cmd)
            if(x.length<=0){
                message.channel.send('command not found')
                return
            }
            x[0].run(message,args)
        })
        Bot.client.on('ready',()=>{
            Bot?.client?.user?.setActivity('ts.help')
            console.log('ready XD')
        })
    }
    start(){
        Bot.client.login(this.token)
    }
}
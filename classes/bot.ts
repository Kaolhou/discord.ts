import { Client, Intents } from "discord.js";
import { config } from 'dotenv'
import Users from '../data/tables/user'
import { sequelize } from '../classes/database'
config()
import command from '../commands/index'
const intents = [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES ]

export default class Bot{
    public static client:Client
    constructor(private token:string){
        Bot.client = new Client({intents})
        Bot.client.on("messageCreate", (message):void=> {
            if(message.author.bot) return
            this.increment(message)
            if(!message.content.startsWith(process.env.PREFIX!))return
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
    async increment(message:any){
        const selUser = await Users.findAll({where:{user: message.author.id}})
        if(!(selUser.length===1&&Array.isArray(selUser))){
            await Users.create({count:1,user: message.author.id})
        }else{
            let cont = await Users.findAll({attributes: ['count'],
                where:{user: message.author.id}
            })  
            let x =cont[0].toJSON().count+1
            await sequelize.query('UPDATE `Users` SET `count`= '+ x +' WHERE `user` = "'+ message.author.id +'";')
            if(x===15){
                await message.channel.send('meus parabéns corno vc mandou 15 mensagens... agr cala a boca')
            }
        }
    }
}
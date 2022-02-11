import { Client, Intents } from "discord.js";
import { config } from 'dotenv'
import Users from '../data/tables/user'
import { sequelize } from '../classes/database'
config()
import command from '../commands/index'
import sexo from '../functions/sexo'
/*const intents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS ]
const partials = ['MESSAGE', 'CHANNEL', 'REACTION']*/

export default class Bot{
    public static client:Client
    constructor(private token:string){
        Bot.client = new Client({
            intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS ],
            partials:['MESSAGE', 'CHANNEL', 'REACTION']
        })
        Bot.client.on("messageCreate", (message):void=> {
            if(message.author.bot) return
            sexo(message)
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
        Bot.client.on('messageReactionAdd', async (reaction, user) => {
            console.log(reaction)
            if (reaction.partial) {
                try {
                    await reaction.fetch();
                } catch (error) {
                    console.error('Something went wrong when fetching the message:', error);
                    return;
                }
            }
            console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
            console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
        });
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
            await Users.create({count:1,user: message.author.id,author:message.author.username})
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
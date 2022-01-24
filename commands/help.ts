import { MessageEmbed } from "discord.js"
import Command from "../interfaces/Command"

const help:Command = {
    name: 'help',
    description: 'show all commands',
    run: async function(message:any, args:string):Promise<string>{
        
        //if(!args)return await channel.send('PONG')
        const embed = new MessageEmbed()
            .setColor('#6666ff')
            .setTitle('Help')
            .setDescription('Ping\n')
        return await message.channel.send({embeds: [embed]})
    }
}
export default help
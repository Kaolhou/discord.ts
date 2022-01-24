import Command from "../interfaces/Command"
import { MessageEmbed } from "discord.js"
import randomize from "../functions/randomize"
import kiss from '../data/kiss/kiss.json'


const Kiss:Command = {
    name: 'kiss',
    description: 'kiss someone',
    run: async function(message:any, args:string):Promise<string>{   
        if(!args||(args.startsWith('<@!')&&!(args.charAt(args.length-1)==='>'))){
            const embed = new MessageEmbed()
                .setColor('#6666ff')
                .setTitle('Kiss')
                .setDescription(`opss... acabei de te beijar <@!${message.author.id}>`)
                .setImage(randomize(kiss))
            return await message.channel.send({embeds: [embed]})
        }
        const embed = new MessageEmbed()
            .setColor('#6666ff')
            .setTitle('Kiss')
            .setDescription(`${message.author.username} acaba de beijar ${args}`)
            .setImage(randomize(kiss))
        return await message.channel.send({embeds: [embed]})
    }
}
export default Kiss
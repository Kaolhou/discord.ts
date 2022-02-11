import { MessageEmbed } from "discord.js"
import Command from "../interfaces/Command"
    
const help:Command = {
    name: 'help',
    description: 'show all commands',
    run: async function(message:any, args:string):Promise<string>{
        const embed = new MessageEmbed()
            .setColor('#6666ff')
            .setTitle('Command Help')
            .setDescription('Ping\nKiss\nMine')
            .setFooter({text:'Prefix ts.'}).setThumbnail('https://iconape.com/wp-content/png_logo_vector/typescript.png')
        return await message.channel.send({embeds: [embed]})
    }
}
export default help
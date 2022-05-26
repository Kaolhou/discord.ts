import { SlashCommandBuilder } from "@discordjs/builders"
import { MessageEmbed } from "discord.js"
import { CommandI } from "../utils/types"

const help:CommandI = {
    exe: async function(interaction, client){
        const commands = client.commands.map((i)=>i.data.name)
        const strFormat = function(arr:string[]){
            let acul = ''

            arr.forEach((i)=>{acul +='- '+i+'\n'})
            return acul
        }
        const embed = new MessageEmbed()
            .setAuthor({name: 'discord.ts'})
            .setDescription(strFormat(commands))
        return await interaction.channel?.send({embeds:[embed]})
        
    },
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('show all commands')
}
export default help
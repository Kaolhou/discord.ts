import { SlashCommandBuilder } from "@discordjs/builders"
import { MessageEmbed } from "discord.js"
import { CommandI } from "../utils/types"

const help:CommandI = {
    exe: async function(interaction, client){
        if(interaction){
            const commands = client.commands
            const embed = new MessageEmbed()
                .setTitle('LISTA DE COMANDOS'/*strFormat(commands)*/)

            commands.forEach((i)=>{
                embed.addField(`${i.data.name}${i.perms!=undefined?` <${i.perms}>`:''}`,i.data.description)
            })
            return await interaction.reply({embeds:[embed]})
        }
        
    },
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('show all commands')
}
export default help
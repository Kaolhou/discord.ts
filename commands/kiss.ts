import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandI } from "../utils/types"
import { randomize } from '../utils/randomize'
import kissJson from '../data/kiss.json'

const kiss:CommandI = {
    exe: async function(interaction){
        if(interaction){
            const person = interaction.options.getMentionable('person')
            if(interaction.user.id==person?.valueOf())return await interaction.reply({
                ephemeral:true,
                content: 'Você não pode mencionar a si mesmo'
            })
            const arrOfRes = [
                `ops!! ${interaction.user.username} acaba de beijar ${person}`,
                `uiii ${interaction.user.username} beijou ${person}❤❤`,
                //todo criar mais respostas
            ]

            await interaction.channel?.send({
                content: randomize(arrOfRes),
                files:[randomize(kissJson)]
            })
            //todo enviar foto anexada de personagens de anime se beijando
        }
        
    },
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('kiss someone')
        .addMentionableOption(
            option=>option
                .setName('person')
                .setDescription('person')
                .setRequired(true)
        )
        
}
export default kiss
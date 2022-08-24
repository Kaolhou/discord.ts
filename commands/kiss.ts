import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandI } from "../utils/types"

const kiss:CommandI = {
    exe: async function(interaction, client){
        if(interaction){
            // prisma.memes.
            const person = interaction.options.getMentionable('person')
            
            console.log(person?.valueOf())

            interaction.channel?.send(`ops acabei de beijar ${person}`)
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
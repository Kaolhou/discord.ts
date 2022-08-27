import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandI } from "../utils/types"

const memes:CommandI = {
    exe: async function(interaction, client){
        if(interaction){
            // prisma.memes.
            interaction.options.getBoolean('nsfw')
            console.log(client.users)
            interaction.channel?.send('meme')
        }
        
    },
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('show a meme')
        .addStringOption(
            option=>option
                .setName('tags')
                .setDescription('select a tag for memes')
                .setRequired(true)
        )
        .addBooleanOption(
            option=>option
                .setName('nsfw')
                .setDescription('accept nsfw/sensitive content')
                .setRequired(true)
        )
}
export default memes
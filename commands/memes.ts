import { SlashCommandBuilder } from "@discordjs/builders"
import path from "path"
import { prisma } from "../prisma/prisma"
import { randomize } from "../utils/randomize"
import { CommandI } from "../utils/types"

const memes:CommandI = {
    exe: async function(interaction, client){
        if(interaction){
            const file = randomize(await prisma.memes.findMany())
            await interaction.reply({
                files:[{
                    attachment:path.resolve(process.env!.PATH_MEMES!, file.name),
                    name: file.name.endsWith('.jfif')?file.name.slice(0,-5).concat('.jpeg'):file.name
                }]
            })
            // interaction.options.getBoolean('nsfw')
            // console.log(client.users)
            // interaction.channel?.send('meme')
        }
        
    },
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('show a meme')
        /*.addStringOption(
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
        )*/
}
export default memes
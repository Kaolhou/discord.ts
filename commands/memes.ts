import { SlashCommandBuilder } from "@discordjs/builders"
import path from "path"
import { prisma } from "../prisma/prisma"
import { randomize } from "../utils/randomize"
import { CommandI } from "../utils/types"

const memes:CommandI = {
    exe: async function(interaction, client){
        if(interaction){
            const nsfw = interaction.options.getBoolean('sensitive')
            
            const file = randomize(await prisma.memes.findMany({
                where: {
                    nsfw: nsfw===true
                }
            }))
            await interaction.reply({
                files:[{
                    attachment:path.resolve(process.env!.PATH_MEMES!, file.name),
                    name: file.name.endsWith('.jfif')?file.name.slice(0,-5).concat('.jpeg'):file.name,
                    spoiler: nsfw===true
                }]
            })
        }
    },
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('show a meme')
        .addBooleanOption(
            option=>option
                .setName('sensitive')
                .setDescription('accept nsfw/sensitive content')
                .setRequired(false)
        )
        /*.addStringOption(
            option=>option
                .setName('tags')
                .setDescription('select a tag for memes')
                .setRequired(true)
        )*/
}
export default memes
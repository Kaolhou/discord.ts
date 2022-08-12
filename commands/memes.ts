import { SlashCommandBuilder } from "@discordjs/builders"
import { prisma } from "../prisma/prisma"
// import { MessageEmbed } from "discord.js"
import { CommandI } from "../utils/types"

const memes:CommandI = {
    exe: async function(interaction, client){
        // prisma.memes.
        interaction.options.getBoolean('nsfw')
        
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
                .setDescription('true => will accept nsfw/sensitive content')
                .setRequired(true)
        )
}
export default memes
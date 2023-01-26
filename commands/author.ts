import { EmbedBuilder } from "@discordjs/builders"
import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"

const author:CommandI = {
    async exe(interaction,client){
        const embed = new EmbedBuilder()
            .setAuthor({name:'André Mendes da Rocha',url:'https://github.com/Kaolhou'})
            .setThumbnail('https://github.com/Kaolhou.png')
            .setDescription("Junior JS/TS Developer, Computer Science Student, Brazil :flag_br:\nThis project is for learning reasons and is Open Source, you can check the Source Code here: https://github.com/Kaolhou/discord.ts")
            .addFields(
                {
                    name:'Spotify',
                    value:'https://open.spotify.com/user/dedet0dy',
                    inline:true
                },
                {
                    name:'Github',
                    value:'https://github.com/Kaolhou',
                    inline:true
                }
            )
        interaction.editReply({
            embeds:[embed]
        })
    },
    data: new SlashCommandBuilder()
        .setName('author')
        .setDescription('show about the creator of bot')
}
export default author
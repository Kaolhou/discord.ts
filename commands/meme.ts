import axios from "axios"
import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"


const meme:CommandI = {
    async exe(interaction, client) {
        let x = await axios.get(process.env!.MEME_ENDPOINT!)
        // console.log(x.data.preview[x.data.preview.length-1])
        // let y = new EmbedBuilder().setImage(x.data.preview[x.data.preview.length-1])
        await interaction.editReply({
            files:[{
                name:x.data.url,
                attachment:x.data.preview[x.data.preview.length-1]
            }]
        })
    },
    data:new SlashCommandBuilder()
        .setName('meme')
        .setDescription('show a meme')
}

export default meme
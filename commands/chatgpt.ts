// import { ChatGPTAPI } from "chatgpt"
import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"
const chatgpt:CommandI = {
    async exe(interaction,client){
        const{ ChatGPTAPI } = await import('chatgpt')
        const api = new ChatGPTAPI({
            apiKey: process.env!.OPEN_AI_KEY!,
        })
        let res = await api.sendMessage(interaction.options.get('query',true).value as string)
        interaction.editReply(`**\`${interaction.options.get('query',true).value as string}\`** \n\n${res.text}`)
    },
    data: new SlashCommandBuilder()
        .setName('chatgpt')
        .setDescription('ask a question for chatgpt')
        .addStringOption(
            option => option
                .setName('query')
                .setDescription('chat gpt message question')
                .setRequired(true)
        )
}
export default chatgpt
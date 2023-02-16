// import { ChatGPTAPI } from "chatgpt"
import { SlashCommandBuilder } from "discord.js"
import Keyv from 'keyv'
import { CommandI } from "../util/types"
import { config } from "dotenv";config()
const chatgpt:CommandI = {
    async exe(interaction,client){
        const{ ChatGPTAPI } = await import('chatgpt')
        const prompt = interaction.options.get('query',true).value as string
        const api = new ChatGPTAPI({
            apiKey: process.env!.OPEN_AI_KEY!,
            messageStore: new Keyv(process.env!.DATABASE_URL!),
            debug:false,
        })
        const lastMessage = await client.prisma.conversations.findFirst({
            where:{
                channelId: interaction.channelId,
                userID: interaction.user.id
            },
            orderBy:{
                created_at:'desc'
            }
        })
        try {
            if(lastMessage){
                var res = await api.sendMessage(prompt,{
                    conversationId: lastMessage.conversationId,
                    parentMessageId: lastMessage.messageId,
                })
            }else{
                var res = await api.sendMessage(prompt)
            }
            await client.prisma.conversations.create({
                data:{
                    channelId:interaction.channelId,
                    userID:interaction.user.id,
                    conversationId:res.conversationId!,
                    messageId:res.id
                }
            })
            interaction.editReply(`**\`${interaction.options.get('query',true).value as string}\`** \n\n${res.text}`)
        } catch (error) {
            console.log(error)
            interaction.editReply('houve um erro, possivelmente os servidores estão em excesso de uso')
        }
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
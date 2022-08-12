import { SlashCommandBuilder } from "@discordjs/builders"
import { TextChannel, MessageReaction } from "discord.js"
import { CommandI } from "../utils/types"

const tictactoe:CommandI = {
    exe: async function(interaction, client){

        const ms = 1000 * 60 * 3 //tres minutos

        
        const user = interaction.options.getMentionable('user') // mentionated user

        //const Filter = (reaction,user)=>

        
        const msg = await interaction.channel?.send({content:`${user}, por favor reaja a essa mensagem para poder jogar`,})
        await msg?.react('✅')
        msg?.awaitReactions(
            {
                max: 1, 
                time: 30000, 
                errors: ["time"], 
                filter:
                    (reaction, userR) => userR == user
            }
        ).then((collected)=>{
            console.log(collected)
        })



        await new Promise(r => setTimeout(r, ms))

    },
    data: new SlashCommandBuilder()
        .setName('tictactoe')
        .setDescription('start a tictactoe game')
        .addMentionableOption(
            option => option
                .setName('user')
                .setDescription('User to play with')
                .setRequired(true)
        )
}
export default tictactoe
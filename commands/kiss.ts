import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"
import randomize from '../util/randomize'
import kisses from '../media/kiss.json'

const kiss:CommandI = {
    async exe(interaction,client){
        const target = interaction.options.getUser('target',true)
        
        interaction.editReply({
            content:`woopps!! ${interaction.user.username} just kissed <@${target.id}>`,
            files:[{
                name:'kiss.gif',
                attachment:randomize(kisses)
            }]
        })

    },
    data: new SlashCommandBuilder()
        .setName('kiss')
        .setDescription('kiss someone')
        .addUserOption(
            option => option
                .setName('target')
                .setDescription('target of who will be kissed')
                .setRequired(true)
        )
}
export default kiss
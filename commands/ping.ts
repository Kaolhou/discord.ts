import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandI } from "../utils/types"

const ping:CommandI = {
    exe: async function(interaction, client){
        try {
            if(interaction){
                await interaction.editReply(`Pong 🏓🏓\n${client.ws.ping}ms`)
            }
        } catch (error) {
            console.error(error)
            interaction.deleteReply()
        }
    },
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Answer with Pong')
}

export default ping
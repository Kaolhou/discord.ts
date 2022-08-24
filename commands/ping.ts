import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandI } from "../utils/types"

const ping:CommandI = {
    exe: async function(interaction, client){
        if(interaction){
            await interaction.reply(`Pong 🏓🏓\n${client.ws.ping}ms`)
        }
    },
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Answer with Pong')
}

export default ping
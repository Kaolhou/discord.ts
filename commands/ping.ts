import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandI } from "../utils/types"

const ping:CommandI = {
    exe: async function(interaction, client){
        await interaction.reply(`Pong ${client.ws.ping}`)
    },
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Answer with Pong')
}

export default ping
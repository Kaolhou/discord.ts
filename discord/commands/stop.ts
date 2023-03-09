import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"

const stop:CommandI = {
    exe(interaction, client) {
        let connection = client.connections.get(interaction.guildId!)
        let guild = client.guilds.cache.get(interaction.guildId!)
        let member = guild?.members.cache.get(interaction.user.id)

        if(connection){
            if(member?.voice.channel?.id === connection.connection?.joinConfig.channelId){
                connection.connection?.destroy()
                client.connections.delete(interaction.guildId!)
                interaction.editReply('song stoped')
            }else{
                interaction.editReply('you must be connected in the same voice channel then me')
            }
        }else{
            interaction.editReply('no voice connection')
        }
    },
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stop the music')
}

export default stop
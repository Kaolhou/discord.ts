import { SlashCommandBuilder } from "discord.js"
import { CommandI } from "../util/types"
import music from './play'

const next:CommandI = {
    exe(interaction, client) {
        let guild = client.guilds.cache.get(interaction.guildId!)
        let member = guild?.members.cache.get(interaction.user.id)
        let connection = client.connections.get(interaction.guildId!)
        if(connection && member?.voice.channel?.id == connection.channel){
            music.music?.next()
            interaction.editReply(':track_next:next song')
        }else{
            interaction.editReply('you must be connected in the same voice channel then me')
        }
    },
    data: new SlashCommandBuilder()
        .setName('next')
        .setDescription('skips the song')
}

export default next
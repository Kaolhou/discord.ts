import { SlashCommandBuilder } from "discord.js"
import reply from "../util/reply"
import { CommandI } from "../util/types"
import music from './play'

const stop:CommandI = {
    exe(interaction, client) {
        let guild = client.guilds.cache.get(interaction.guildId!)
        let member = guild?.members.cache.get(interaction.user.id)
        let connection = client.connections.get(interaction.guildId!)
        if(connection && member?.voice.channel?.id == connection.channel){
            music.music?.connection?.destroy()
            client.connections.delete(interaction.guildId!)
            reply(interaction,{
                content:'song stoped'
            })
        }else{
            reply(interaction,{
                content:'you must be connected in the same voice channel then me'
            })
        }
    },
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('stop the music')
}

export default stop
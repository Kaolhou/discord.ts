import { SlashCommandBuilder } from "discord.js"
import titleParse from "../util/titleParse"
import { CommandI } from "../util/types"

const next:CommandI = {
    exe(interaction, client) {
        let guild = client.guilds.cache.get(interaction.guildId!)
        let member = guild?.members.cache.get(interaction.user.id)
        let connection = client.connections.get(interaction.guildId!)
        if(connection){
            if(member?.voice.channel?.id == connection.channel){
                connection.next()
                interaction.editReply(`:track_next:next song\n\`now playing\` ${titleParse(connection.next().title)}`)
            }else{
                interaction.editReply('you must be connected in the same voice channel then me')
            }
        }else{
            interaction.editReply('no voice connection')
        }
    },
    data: new SlashCommandBuilder()
        .setName('next')
        .setDescription('skips the song')
}

export default next
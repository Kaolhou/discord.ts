import { SlashCommandBuilder } from "discord.js"
import reply from "../util/reply"
import { CommandI } from "../util/types"
import music from './play'

const next:CommandI = {
    exe(interaction, client) {
        music.music?.next()
        reply(interaction,{
            content:':track_next:next song'
        })
    },
    data: new SlashCommandBuilder()
        .setName('next')
        .setDescription('skips the song')
}

export default next
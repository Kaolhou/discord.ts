import { getVoiceConnection } from "@discordjs/voice";
import { SlashCommandBuilder } from "discord.js";
import { Main } from "..";
import Music from "../structures/Music";
import { CommandI } from "../util/types";


const play:CommandI = {
    music:undefined,
    async exe(interaction, client) {

        let connection = client.connections.get(interaction.guildId!)
        let musicToQueue = interaction.options.get('url',true).value as string

        if(connection){

            this.music = connection

            await this.music.addToQueue(interaction,musicToQueue)

        }else{
            
            this.music = new Music(client,interaction)
            
            client.connections.set(interaction.guildId!,this.music)
            
            await this.music.addToQueue(interaction,musicToQueue)
            
            this.music.playMusic()
        }

    },
    data:new SlashCommandBuilder()
        .setName('play')
        .setDescription('toca música')
        .addStringOption(
            option => option
                .setName('url')
                .setDescription('The video URL')
                .setRequired(true))
                
}
export default play
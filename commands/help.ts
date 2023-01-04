import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandI } from "../util/types";

const help:CommandI = {
    exe(interaction, client) {
        if(interaction){
            const info = new EmbedBuilder()
                .setTitle('Help')
                .setDescription('the prefix is "/", using discord slash commands, check out here: https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ')
            const musics = new EmbedBuilder()
                .setTitle('Music Commands')
                .setColor('Blue')
                
                .setFields([
                    {
                        name:'play',
                        value: 'play a youtube music in a voice channel'
                    },
                    {
                        name:'pause',
                        value:'pause a current song'
                    },
                    {
                        name:'unpause',
                        value:"continue a paused music"
                    },
                    {
                        name:"queue",
                        value:"show the music queue"
                    }
                ])
            const etc = new EmbedBuilder()
                .setTitle('Others Commands')
                .setColor('Blue')
                .setFields([
                    {
                        name:'ping',
                        value:'show the locale ping'
                    }
                ])

            interaction.reply({
                embeds:[info,musics,etc]
            })
        }
    },
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('vou te ajudar')
    
}
export default help
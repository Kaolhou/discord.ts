import { EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CommandI } from "../util/types";

const help:CommandI = {
    async exe(interaction, client) {
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
                    },  
                    {
                        name:'next',
                        value:'skips the song'
                    },
                    {
                        name:'stop',
                        value:'stop the music'
                    },
                    {
                        name:'remove',
                        value:'remove a item from queue'
                    },
                    {
                        name:'lyrics',
                        value:'show the lyrics from a music'
                    },
                    {
                        name:'loop',
                        value:'loops the queue'
                    },
                    {
                        name:'shuffle',
                        value:'shuffle the queue'
                    },
                    {
                        name:'download',
                        value:'download a yt video'
                    }
                ])
            const etc = new EmbedBuilder()
                .setTitle('Others Commands')
                .setColor('Blue')
                .setFields([
                    {
                        name:'ping',
                        value:'show the locale ping'
                    },
                    {
                        name:'meme',
                        value:'show a meme'
                    },
                    {
                        name:'author',
                        value:'show about the creator of bot'
                    },
                    {
                        name:'kiss',
                        value:'kiss someone'
                    }
                ])
            
            await interaction.editReply({
                embeds:[info,musics,etc]
            })
        }
    },
    acceptDM:true,
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('vou te ajudar')
    
}
export default help
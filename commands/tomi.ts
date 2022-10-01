import { SlashCommandBuilder } from "@discordjs/builders"
import { createAudioPlayer, createAudioResource, DiscordGatewayAdapterCreator, joinVoiceChannel } from '@discordjs/voice'
import path from "path"
import { CommandI } from "../utils/types"


const tomi:CommandI={
    exe: async(interaction,client)=>{
        // await client.channels.fetch(interaction.guild?.members.cache.get(interaction.user.id)?.voice.channelId!)
        try {
            var user = interaction.guild?.members.cache.get(interaction.user.id)
        
            if(user?.voice.channelId){
                const connection = joinVoiceChannel({
                    channelId: interaction.guild?.members.cache.get(interaction.user.id)?.voice.channelId!,
                    guildId: interaction.guildId!,
                    adapterCreator: client.guilds.cache.get(interaction.guildId!)!.voiceAdapterCreator! as DiscordGatewayAdapterCreator
                })
                const resource = createAudioResource(path.resolve('./data/mp3/tomi1.mp3'));
                const player = createAudioPlayer()
                player.play(resource)

                connection.subscribe(player)
                interaction.editReply('UIIIII')
                setTimeout(()=> {
                    player.stop()
                    connection.disconnect()
                },1000*60*1.6)
    
            }else{
                console.log(user?.voice.channelId)
                interaction.editReply({
                    content:'não está'
                })
            }
        } catch (error) {
            interaction.deleteReply()
        }
    },
    data: new SlashCommandBuilder()
        .setName('tomi')
        .setDescription('solta um efeito sonoro do rodrigo faro')
}
export default tomi
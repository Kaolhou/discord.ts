import { SlashCommandBuilder } from "discord.js";
import Music from "../structures/Music";
import { CommandI } from "../util/types";


const play:CommandI = {
    /**
     * essa definição music receberia o objeto da classe Music que poderia ser acessada por qualquer
     * outro arquivo do projeto com a finalidade de um comando de música poder alterar o estado de
     * uma voice connection dentro da classe
     */
    music:undefined,
    async exe(interaction, client) {

        let connection = client.connections.get(interaction.guildId!)
        let musicToQueue = interaction.options.get('url',true).value as string

        //se não houver uma conexão de voz, então ela é feita, caso tenha, então apenas adiciona a música na fila
        if(connection){

            this.music = connection
            if(this.music.queue.length == 0){
                await this.music.addToQueue(interaction,musicToQueue)
                this.music.playMusic()
            }else{
                await this.music.addToQueue(interaction,musicToQueue)
            }
            

        }else{
            
            this.music = new Music(client,interaction)
            
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
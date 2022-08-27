import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandI } from "../utils/types"
import fs from 'fs'

const memesChat:CommandI = {
    exe: async function(interaction, client){
        if(interaction){
            try {
                if(interaction.memberPermissions?.has('ADMINISTRATOR')){
                    let channel = interaction.options.getString('input')
                    let CChannel = client.channels.cache.get(channel!)
                    if(!CChannel) return interaction.reply({
                        ephemeral:true,
                        content: 'canal inválido'
                    }) 
                    if(!CChannel?.isText()) return interaction.reply({
                        ephemeral:true,
                        content: 'canal inválido'
                    })
                    fs.readFile('chats.conf','utf-8',(err,data)=>{
                        if(err) throw new Error(String(err))
                        
                        let js:string[] = JSON.parse(data);
                        if(js.find((i)=>i==channel)) {
                            interaction.channel?.send({
                                content: 'não pode incluir canal ja incluido',
                            })
                        }else{
                            js.push(channel!)
                            fs.writeFileSync('chats.conf',JSON.stringify(js)) 
                            return interaction.reply({
                                content:`${CChannel?.id} adicionado com sucesso`,
                                ephemeral:true
                            })   
                        }

                    });
                }else{
                    interaction.reply({
                        ephemeral:true,
                        content:'você não tem permissão de alterar o canal de meme'
                    })
                }
            } catch (error) {
                console.error(error)
            }
        } 
    },
    data: new SlashCommandBuilder()
        .setName('chatmemes')
        .setDescription('get id of the daily memes chat')
        .addStringOption(option =>option
                .setName('input')
                .setDescription('the id of the daily meme chat')
                .setRequired(true)
        ),
    perms: ['ADMINISTRATOR']
    
}
export default memesChat
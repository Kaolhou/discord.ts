import {  SlashCommandBuilder } from "@discordjs/builders"
import { MessageActionRow, MessageButton } from "discord.js"
import path from "path"
import { prisma } from "../prisma/prisma"
import { CommandI } from "../utils/types"

const setnsfw:CommandI = {
    exe: async function(interaction, client){
        if(interaction && interaction.memberPermissions?.has('ADMINISTRATOR')){
            let meme = await prisma.memes.findFirst({
                where:{
                    manuallySelected:false
                }
            })

            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setStyle('SUCCESS')
                    .setLabel('✔')
                    .setCustomId('yes')
            ).addComponents(
                new MessageButton()
                    .setStyle('SECONDARY')
                    .setLabel('❌')
                    .setCustomId('no')
            ).addComponents(
                new MessageButton()
                    .setStyle('DANGER')
                    .setLabel('Close')
                    .setCustomId('close')
            )
            
            
            let msg = await interaction.channel?.send({
                content: meme?.name,
                files:[{
                    attachment:path.resolve(process.env!.PATH_MEMES!, meme!.name),
                    name: meme!.name.endsWith('.jfif')?meme!.name.slice(0,-5).concat('.jpeg'):meme!.name

                }],
                components: [row]
            })

            
            const collector = interaction.channel?.createMessageComponentCollector({
                max:1,
                time:1000*60*60 //1h
            })

            collector?.on('end',async(collection)=>{
                await msg?.delete()
                collection.forEach(async(click)=>{
                    if(click.customId === 'close'){
                        console.log('setter close')
                    }else if(click.customId === 'yes'){
                        await prisma.memes.update({
                            where:{
                                id: meme?.id
                                
                            },
                            data:{
                                nsfw:true,
                                manuallySelected:true
                            }
                        })
                        this.exe(interaction,client)
                    }else if(click.customId === 'no'){
                        await prisma.memes.update({
                            where:{
                                id: meme?.id
                                
                            },
                            data:{
                                nsfw:false,
                                manuallySelected:true
                            }
                        })
                        this.exe(interaction,client)
                    }
                })
            })
        }
        if(!interaction.memberPermissions?.has('ADMINISTRATOR')){
            interaction.reply({
                content:'you have no permision',
                ephemeral:true
            })
        }
    },
    data: new SlashCommandBuilder()
        .setName('setnsfw')
        .setDescription('edit a nsfw meme'),
    perms:['ADMINISTRATOR']
}
export default setnsfw
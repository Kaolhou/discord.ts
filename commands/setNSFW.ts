import {  SlashCommandBuilder } from "@discordjs/builders"
import { MessageActionRow, MessageButton } from "discord.js"
import path from "path"
import { prisma } from "../prisma/prisma"
import { SendMeme } from "../utils/sendMeme"
import { CommandI } from "../utils/types"

const setnsfw:CommandI = {
    exe: async function(interaction, client){
        try {
            if(interaction){
                const src = interaction.options.getString('meme')
                if(!src){
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
                }else{
                    await prisma.memes.update({
                        where:{
                            name: src
                        },
                        data:{
                            nsfw:true,
                            manuallySelected:true
                        }
                    }).then((i)=>{
                        interaction.editReply({
                            content: `${i.name} just changed to nsfw/sensitive content`,
                        })
                    }).catch((e)=>{
                        interaction.editReply({
                            content: `something went wrong, verify the file name`,
                        })
                    })
                }
            }
        } catch (error) {
            console.error(error)
            interaction.deleteReply()
        }
    },
    data: new SlashCommandBuilder()
        .setName('setnsfw')
        .setDescription('edit a nsfw meme')
        .addStringOption(option => option
            .setRequired(false)
            .setName('meme')
            .setDescription('name file')
        ),
    perms:['ADMINISTRATOR']
}
export default setnsfw
import { SlashCommandBuilder } from "discord.js"
import ytdl from "ytdl-core"
import { CommandI } from "../util/types"
import fs from 'fs'
import {resolve} from 'path'
import reply from "../util/reply"

type quality = 'high'|'low'

const download:CommandI = {
    async exe(interaction,client){
        if(!fs.existsSync('../media')){
            fs.mkdirSync('../media');
            client.verbose ? console.log('[download] "./media" folder created') : null
        }
        if(!fs.existsSync('../media/downloads')){
            fs.mkdirSync('../media/downloads');
            client.verbose ? console.log('[download] "./media/downloads" folder created') : null
        }
        const url = interaction.options.get('url',true).value as string
        const quality = (interaction.options.get('quality',false )?.value || 'high') as quality

        let video_info = await ytdl.getInfo(url)
        let videoID = video_info.videoDetails.videoId
        const fileName = `${videoID}_${quality}.mp3`;

        async function sendFile(path:string,fileName:string){
            var stats = fs.statSync(resolve(path,fileName))
            var fileSizeInMegabytes = stats.size / (1024*1024);

            if(fileSizeInMegabytes<=5){
                reply(interaction,{
                    files:[{
                        attachment: process.cwd()+'/media/downloads/'+fileName,
                        name:fileName
                    }]
                })
            }else{
                reply(interaction,{
                    content:`file can't pass 5MB\nyour file: ${fileSizeInMegabytes.toFixed(2)}MB`
                })
            }
        }

        if(fs.readdirSync(resolve(process.cwd(),'media/downloads/')).find(i=>i===fileName)){
            await sendFile(resolve(process.cwd(),'media','downloads'),fileName)
        }else{
            let qualitySound = quality==='high'?'highestaudio':'lowestaudio'
            ytdl.downloadFromInfo(video_info,{
                quality:qualitySound,
                filter:'audioonly'
            })
            .pipe(fs.createWriteStream('./media/downloads/' + fileName))
            .on('finish', async()=>{
                
                await sendFile(resolve(process.cwd(),'media','downloads'),fileName)
                client.verbose ? console.log(`[download] ${fileName} created`) : null
            })
        }
    },
    data: new SlashCommandBuilder()
        .setName('download')
        .setDescription('download a yt video')
        .addStringOption(
            option => option
                .setName('url')
                .setDescription('url from video')
                .setRequired(true)
        )
        .addStringOption(
            option => option
                .setName('quality')
                .setDescription('quality of a sound')
                .addChoices(
                    { name:'high', value:'high' },
                    { name:'low', value:'low' }
                )
                .setRequired(false)
        )
}
export default download
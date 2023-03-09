import axios from "axios"
import { SlashCommandBuilder } from "discord.js"
import Ifunny, { meme } from "../structures/Ifunny"
import { CommandI } from "../util/types"
import Keyv from 'keyv'


const meme:CommandI = {
    async exe(interaction, client) {
        const keyv = new Keyv(process.env!.DATABASE_URL!)
        const source = interaction.commandName==='meme'&&interaction.options.getSubcommand(true) as 'reddit'|'ifunny'|'local'
        if(source === 'reddit'){
            let x = await axios.get(process.env!.MEME_ENDPOINT!)
            await interaction.editReply({
                files:[{
                    name:x.data.url,
                    attachment:x.data.preview[x.data.preview.length-1]
                }]
            })
        }else if(source==='ifunny'){

            var page:number
            var ifunny
            const amontMemes = await keyv.get('amontMemes') as meme[]|undefined

            if(await keyv.get('ifunny_token'))
                ifunny = new Ifunny({axios,token:await keyv.get('ifunny_token')})

            else{
                ifunny = new Ifunny({axios})
                await ifunny.getToken()
                //todo adicionar set do getToken
            }

            if(await keyv.get('page')){
                page = await keyv.get('page')
            }else{
                await keyv.set('page',1)
                page=1
            }

            
            if(amontMemes&&amontMemes.length>0){
                var meme = amontMemes.shift()
                await keyv.set('amontMemes',amontMemes)

            }else{
                if(!amontMemes){
                    var data = ((await ifunny.getMemes(page)).items).sort(()=> Math.random() * -.5)
                    var meme = data.shift()

                }else{
                    console.log(page)
                    await keyv.set('page',page+1)
                    var data = ((await ifunny.getMemes((await keyv.get('page'))+1)).items).sort(()=> Math.random() * -.5)
                    var meme = data.shift()

                } 
                await keyv.set('amontMemes',data)

            }


            interaction.editReply(meme!.url)
            

        }else if(source==='local'){
            interaction.editReply('sorry, working on that')
        }
    },
    //todo trocar choice por subcommand
    acceptDM:true,
    data:new SlashCommandBuilder()
        .setName('meme')
        .setDescription('show a meme')
        .addSubcommand(
            option => option
                .setName('ifunny')
                .setDescription('the platform source')              
        )
        .addSubcommand(
            option => option
                .setName('reddit')
                .setDescription('the platform source')              
        )
        .addSubcommand(
            option => option
                .setName('local')
                .setDescription('the platform source')              
        )
}

export default meme
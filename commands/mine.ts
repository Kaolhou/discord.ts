import Command from "../interfaces/Command"
import fetch from 'cross-fetch'
    
const mine:Command = {
    name: 'mine',
    description: 'show the skin from user using Mojang API',
    run: async function(message:any, args:string):Promise<void>{
        const allArgs:string[] = args.split(' ')
        const username = allArgs[0]

        
        fetch(`https://api.mojang.com/user/profile/agent/minecraft/name/${username}`).then(prom=>{
            prom.json().then(async (data)=>{
                const id = data.id
                fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${id}`).then(prom=>{
                    prom.json().then(async (res)=>{
                        let ok =  Buffer.from(res.properties[0].value,'base64').toString()
                        var send = JSON.parse(ok)
                        return await message.channel.send(send.textures.SKIN.url)
                    })
                })
            })
        })
    }
}
export default mine
import Command from "../interfaces/Command"

const ping:Command = {
    name: 'ping',
    description: 'answer with pong',
    run: async function(message:any, args:string):Promise<string>{
        if(!args)return await message.channel.send('PONG')
        return await message.channel.send(args)
    }
}
export default ping
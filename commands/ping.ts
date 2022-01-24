import Command from "../interfaces/Command"

const ping:Command = {
    name: 'ping',
    description: 'answer with pong',
    run: async function(channel:any, args:string):Promise<string>{
        if(!args)return await channel.send('PONG')
        return await channel.send(args)
    }
}
export default ping
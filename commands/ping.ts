<<<<<<< HEAD
import Command from "../interfaces/Command"

const ping:Command = {
    name: 'ping',
    description: 'answer with pong',
    run: async function(message:any, args:string):Promise<string>{
        if(!args)return await message.channel.send('PONG')
        return await message.channel.send(args)
    }
}
=======
import { SlashCommandBuilder } from "@discordjs/builders"
import { CommandI } from "../utils/types"

const ping:CommandI = {
    exe: async function(interaction, client){
        await interaction.reply(`Pong ${client.ws.ping}`)
    },
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Answer with Pong')
}

>>>>>>> v2
export default ping
import { EventI } from "../util/types";


const interactionCreate:EventI<'interactionCreate'> = {
    eventName: 'interactionCreate',
    exe(client, interaction) {
        if(interaction.isCommand()){
            const command = client.commands.get(interaction.commandName)
            if(interaction.memberPermissions?.has('UseApplicationCommands')){
                command?.exe(interaction,client)
            }else{
                interaction.reply({
                    ephemeral:true,
                    content:"você não tem permissão para usar comandos"
                })
            }
        }
    },
    once:false
} 
export default interactionCreate
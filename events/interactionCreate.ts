import { EventI } from "../util/types";

/**
 * Evento responsável por verificar se o usuário tem permissões de usar **Slash Commands**,
 * criar um log no banco de dados e executar o commando baseado na ``Collection`` de commandos disponoibilizado
 * na classe **Main**
 */
const interactionCreate:EventI<'interactionCreate'> = {
    eventName: 'interactionCreate',
    async exe(client, interaction) {
        if(interaction.isChatInputCommand()){
            //collection
            const command = client.commands.get(interaction.commandName)
            //checar permissões
            if(interaction.memberPermissions?.has('UseApplicationCommands')){
                //criar log no banco de dados
                await client.prisma.logs.create({
                    data: {
                        isError:false,
                        authorId:interaction.user.id,
                        command: command?.data.toJSON().name!,
                    }
                })
                await interaction.deferReply()
                command?.exe(interaction,client)
            }else{
                await interaction.reply({
                    ephemeral:true,
                    content:"você não tem permissão para usar comandos"
                })
            }
        }
    },
    once:false
} 
export default interactionCreate
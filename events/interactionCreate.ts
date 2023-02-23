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
            const command = client.commands.get(interaction.commandName)
            //todo criar lista negra
            //checar permissões
            if(interaction.inGuild()?!interaction.memberPermissions?.has('UseApplicationCommands'):false){
                return await interaction.reply({
                    ephemeral:true,
                    content:"você não tem permissão para usar comandos"
                })
            }
            if(command?.perms){
                if(!(command.perms.map((i)=>interaction.memberPermissions?.has(i)).every((i)=>i===true)))
                    return await interaction.reply({
                        ephemeral:true,
                        content:"você não tem permissão para usar comandos"
                    })
            }
            if(!interaction.inGuild()&&!command?.acceptDM){
                return await interaction.reply({
                    ephemeral:true,
                    content:"esse comando não pode ser usado em uma DM"
                })
            }
            //criar log no banco de dados
            await client.prisma.logs.create({
                data: {
                    isError:false,
                    authorId:interaction.user.id,
                    command: command!.data.toJSON().name,
                }
            })
            //executar command
            await interaction.deferReply()
            command?.exe(interaction,client)
        }
    },
    once:false
} 
export default interactionCreate
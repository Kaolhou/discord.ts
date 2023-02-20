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
                await interaction.reply({
                    ephemeral:true,
                    content:"você não tem permissão para usar comandos"
                })
                return
            }
            if(!interaction.inGuild()&&!command?.acceptDM){
                await interaction.reply({
                    ephemeral:true,
                    content:"esse comando não pode ser usado em uma DM"
                })
                return
            }
            //criar log no banco de dados
            await client.prisma.logs.create({
                data: {
                    isError:false,
                    authorId:interaction.user.id,
                    command: command?.data.toJSON().name!,
                }
            })
            // verificar se é dm
            if(!interaction.inGuild()){
                await interaction.reply('eba')
            }else{
                //checar permissões
                
                await interaction.deferReply()
                command?.exe(interaction,client)

            }
        }
    },
    once:false
} 
export default interactionCreate
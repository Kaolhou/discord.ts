import { SlashCommandBuilder } from "discord.js"
import { loopToggle } from "../structures/Music"
import { CommandI } from "../util/types"

const loop:CommandI = {
    async exe(interaction,client){
        let connection = client.connections.get(interaction.guildId!)                

        function isLoopToogle(str:string):str is loopToggle{
            return str === 'all' || str === 'one' || str === "off"
        }
        if(connection){

            if(connection.loopStatus) {
                let value = interaction.options.get('value')?.value! as string
                if(isLoopToogle(value)){
                    connection.loopStatus = value
                }
                interaction.editReply(`looped as \`${value}\``)
            }
        }else{
            interaction.editReply('no voice connection')
        }
    },
    data: new SlashCommandBuilder()
        .setName('loop')
        .setDescription('loop the queue')
        .addStringOption(
            option => option
                .setName('value')
                .setDescription('option for loop')
                .setRequired(true)
                .addChoices(
                    {name:'off',value:'off'},
                    {name:'one',value:'one'},
                    {name:'all',value:'all'}
                )
        )
}
export default loop
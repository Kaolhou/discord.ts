import { SlashCommandBuilder } from "discord.js"
import { loopToggle } from "../structures/Music"
import { CommandI } from "../util/types"
import play from './play'

const loop:CommandI = {
    async exe(interaction,client){
        function isLoopToogle(str:string):str is loopToggle{
            return str === 'all' || str === 'one' || str === "off"
        }
        if(play.music?.loopStatus) {
            let value = interaction.options.get('value')?.value! as string
            if(isLoopToogle(value)){
                play.music.loopStatus = value
            }
            interaction.editReply(`looped as \`${value}\``)
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
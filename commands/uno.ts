import { SlashCommandBuilder, User } from "discord.js"
import Uno from "../structures/Uno"
import { CommandI } from "../util/types"

function removeDuplicates(arr:User[]){
    return [...new Set(arr)];
}

const uno:CommandI = {
    async exe(interaction,client){
        const players = [
            interaction.user,
            interaction.options.getUser('player1', false)!,
            interaction.options.getUser('player2', false)!,
            interaction.options.getUser('player3', false)!,
            interaction.options.getUser('player4', false)!,
            interaction.options.getUser('player5', false)!,
            interaction.options.getUser('player6', false)!,
            interaction.options.getUser('player7', false)!,
        ]
        .filter(i=>i!==null)
        .filter(i=>!i.bot)

        if(removeDuplicates(players).length < 2){
            return interaction.editReply('min 2 players')
        }

        let uno:Uno|null = new Uno({
            players:removeDuplicates(players),
            interaction,
            client
        })
        const events = uno.getHandler()
        events.on('win',()=>{
            uno = null
        })
    },
    data: new SlashCommandBuilder()
        .setName('uno')
        .setDescription('a simple uno game')
        .addUserOption(
            option => option
                .setName('player1')
                .setDescription('player')
                .setRequired(false)
        )
        .addUserOption(
            option => option
                .setName('player2')
                .setDescription('player')
                .setRequired(false)
        )
        .addUserOption(
            option => option
                .setName('player3')
                .setDescription('player')
                .setRequired(false)
        )
        .addUserOption(
            option => option
                .setName('player4')
                .setDescription('player')
                .setRequired(false)
        )
        .addUserOption(
            option => option
                .setName('player5')
                .setDescription('player')
                .setRequired(false)
        )
        .addUserOption(
            option => option
                .setName('player6')
                .setDescription('player')
                .setRequired(false)
        )
        .addUserOption(
            option => option
                .setName('player7')
                .setDescription('player')
                .setRequired(false)
        )
}
export default uno
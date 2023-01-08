import { SlashCommandBuilder } from "discord.js";
import reply from "../util/reply";
import { CommandI } from "../util/types";


const ping:CommandI = {
    async exe(interaction, client) {
        await reply(interaction,{
            message:`PONG:ping_pong::ping_pong:\n${client.ws.ping}ms`
        })
    },
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('get locale ping')
}

export default ping
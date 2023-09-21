import { SlashCommandBuilder, } from "discord.js";
import Command from "../classes/base/Command";
class Ping extends Command {
    async execute(client, interaction) {
        await interaction.editReply(`PONG: ${client.ws.ping}ms`);
    }
}
export default new Ping(new SlashCommandBuilder().setName("ping").setDescription("pong"));

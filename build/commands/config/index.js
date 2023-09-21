import { SlashCommandBuilder, } from "discord.js";
import Command from "../../classes/base/Command";
import log from "./log";
class Config extends Command {
    async execute(client, interaction) {
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case "log":
                log.execute(client, interaction);
                break;
            default:
                await interaction.editReply("algo houve de errado");
        }
    }
}
export default new Config(new SlashCommandBuilder()
    .setName("config")
    .setDescription("configure the server")
    .addSubcommand(log.data));

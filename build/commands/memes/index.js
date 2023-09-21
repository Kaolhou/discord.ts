import { SlashCommandBuilder, } from "discord.js";
import Command from "../../classes/base/Command";
import random from "./random";
class Meme extends Command {
    async execute(client, interaction) {
        const subcommand = interaction.options.getSubcommand();
        switch (subcommand) {
            case "random":
                random.execute(client, interaction);
                break;
            default:
                await interaction.editReply("algo houve de errado");
        }
    }
}
export default new Meme(new SlashCommandBuilder()
    .setName("meme")
    .setDescription("envia um meme")
    .addSubcommand(random.data));

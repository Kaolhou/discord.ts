import { SlashCommandBuilder, } from "discord.js";
import Command from "../../classes/base/Command";
class Games extends Command {
    async executar(client, interaction) {
        await interaction.editReply("foi");
    }
}
export default new Games(new SlashCommandBuilder()
    .setName("game")
    .setDescription("discord games")
    .setDescriptionLocalization("pt-BR", "jogos para discord"));

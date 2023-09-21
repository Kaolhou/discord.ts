import { SlashCommandBuilder, } from "discord.js";
import Command from "../../classes/base/Command";
class Uno extends Command {
    async executar(client, interaction) {
        await interaction.editReply("foi");
    }
}
export default new Uno(new SlashCommandBuilder()
    .setName("uno")
    .setDescription("lets play uno")
    .setDescriptionLocalization("pt-BR", "vamos jogar uno"));

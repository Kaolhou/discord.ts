import { SlashCommandBuilder, } from "discord.js";
import Command from "../classes/base/Command";
import path from "path";
class Termos extends Command {
    async execute(client, interaction) {
        await interaction.editReply({
            content: "# Termos de uso\nnão mim use pra fazer abobrina, wuaaaa, memes naum é cumigo\nassinado: Advogado muito sério",
            files: [path.resolve(process.cwd(), "assets", "gato_advogado.jpg")],
        });
    }
}
export default new Termos(new SlashCommandBuilder().setName("termos").setDescription("termos de uso"));

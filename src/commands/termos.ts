import {
  CacheType,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import Command from "../classes/base/Command";
import Main from "../classes/Main";
import path from "path";
class Termos extends Command {
  async execute(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    await interaction.editReply({
      content:
        "# Termos de uso\nnão mim use pra fazer abobrina, wuaaaa, memes naum é cumigo\nassinado: Advogado muito sério",
      files: [path.resolve(process.cwd(), "assets", "gato_advogado.jpg")],
    });
  }
}

export default new Termos(
  new SlashCommandBuilder().setName("termos").setDescription("termos de uso")
);

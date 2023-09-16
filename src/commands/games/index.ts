import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../../classes/base/Command";
import Main from "../../classes/Main";

class Games extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    await interaction.editReply("foi");
  }
}

export default new Games(
  new SlashCommandBuilder()
    .setName("game")
    .setDescription("discord games")
    .setDescriptionLocalization("pt-BR", "jogos para discord")
);
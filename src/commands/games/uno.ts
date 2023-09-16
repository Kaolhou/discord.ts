import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../../classes/base/Command";
import Main from "../../classes/Main";

class Uno extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    await interaction.editReply("foi");
  }
}

export default new Uno(
  new SlashCommandBuilder()
    .setName("uno")
    .setDescription("lets play uno")
    .setDescriptionLocalization("pt-BR", "vamos jogar uno")
);
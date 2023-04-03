import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command";
import { Main } from "../classes/Main";

class Ping extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    await interaction.editReply("foi");
  }
}

export default new Ping(
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("show locale ping")
    .setDescriptionLocalization("pt-BR", "mostra o ping local")
);

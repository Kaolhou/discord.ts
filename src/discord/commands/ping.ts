import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command.js";
import { Main } from "../classes/Main.js";

class Ping extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    await interaction.editReply(
      `PONG!!:table_tennis::table_tennis:\n${client.ws.ping}ms`
    );
  }
}

export default new Ping(
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("show locale ping")
    .setDescriptionLocalization("pt-BR", "mostra o ping local")
);

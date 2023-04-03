import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command";
import { Main } from "../classes/Main";
import Music from "../classes/Music";

class Play extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const prompt = interaction.options.getString("link", true);
    let connection = client.voiceConnections.get(interaction.guildId!);

    if (connection) {
      if (connection.queue.length == 0) {
        await connection.addToQueue(interaction, prompt);
        connection.playMusic();
      } else {
        await connection.addToQueue(interaction, prompt);
      }
    } else {
      connection = new Music(client, interaction);

      await connection.addToQueue(interaction, prompt);

      connection.playMusic();
    }
  }
}

export default new Play(
  new SlashCommandBuilder()
    .setName("play")
    .setDescription("Play a song")
    .setDescriptionLocalization("pt-BR", "Toca uma música")
    .addStringOption((option) =>
      option
        .setRequired(true)
        .setName("link")
        .setDescription("Video URL")
        .setDescriptionLocalization("pt-BR", "URL do vídeo")
    )
);

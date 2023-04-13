import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command.js";
import { Main } from "../classes/Main.js";
import Music from "../classes/Music.js";
import { LocaleResponses } from "../../types.js";

const RESPONSES: LocaleResponses = {
  userNotConnected: {
    "pt-BR": "Você precisa estar conectado em um canal de voz",
    "en-US": "You must be connected in a voice channel",
  },
};
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
      if (
        !connection.isUserConnected(
          interaction.guild?.members.cache.get(interaction.user.id)
        )
      ) {
        interaction.editReply(
          RESPONSES.userNotConnected[interaction.locale] ||
            RESPONSES.userNotConnected["en-US"]
        );
        return;
      }

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

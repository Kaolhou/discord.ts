import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command.js";
import { Main } from "../classes/Main.js";
import { LocaleResponses } from "../../types.js";

const RESPONSES: LocaleResponses = {
  noVoiceConnection: {
    "en-US": "No voice connection",
    "pt-BR": "Sem conexão de voz",
  },
  songPaused: {
    "en-US": "Song Paused",
    "pt-BR": "Música Pausada",
  },
};

class Pause extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const connection = client.voiceConnections.get(interaction.guildId!);
    if (connection) {
      connection.pause();
      interaction.editReply(
        RESPONSES.songPaused[interaction.locale] ||
          RESPONSES.songPaused["en-US"]
      );
    } else {
      interaction.editReply(
        RESPONSES.noVoiceConnection[interaction.locale] ||
          RESPONSES.noVoiceConnection["en-US"]
      );
    }
  }
}

export default new Pause(
  new SlashCommandBuilder()
    .setName("pause")
    .setNameLocalization("pt-BR", "pausar")
    .setDescription("Pause a song")
    .setDescriptionLocalization("pt-BR", "Pausa uma música")
);

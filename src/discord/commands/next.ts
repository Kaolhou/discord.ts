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
  songSkipped: {
    "en-US": "Song skipped",
    "pt-BR": "Música pulada",
  },
};

class Next extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const connection = client.voiceConnections.get(interaction.guildId!);
    if (connection) {
      await connection.next();
      interaction.editReply(
        RESPONSES.songSkipped[interaction.locale] ||
          RESPONSES.songSkipped["en-US"]
      );
    } else {
      interaction.editReply(
        RESPONSES.noVoiceConnection[interaction.locale] ||
          RESPONSES.noVoiceConnection["en-US"]
      );
    }
  }
}

export default new Next(
  new SlashCommandBuilder()
    .setName("next")
    .setDescription("Skips a song")
    .setDescriptionLocalization("pt-BR", "Pula uma música")
);

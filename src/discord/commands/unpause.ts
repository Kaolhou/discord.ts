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
  songUnpaused: {
    "en-US": "Song Paused",
    "pt-BR": "Música Pausada",
  },
  unsuccessUnpause: {
    "en-US": "Music not continued",
    "pt-BR": "Música não continuada",
  },
};

class Unpause extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const connection = client.voiceConnections.get(interaction.guildId!);
    if (connection) {
      const success = connection.unpause();
      if (success) {
        interaction.editReply(
          RESPONSES.songUnpaused[interaction.locale] ||
            RESPONSES.songUnpaused["en-US"]
        );
      } else {
        interaction.editReply(
          RESPONSES.unsuccessUnpause[interaction.locale] ||
            RESPONSES.unsuccessUnpause["en-US"]
        );
      }
    } else {
      interaction.editReply(
        RESPONSES.noVoiceConnection[interaction.locale] ||
          RESPONSES.noVoiceConnection["en-US"]
      );
    }
  }
}

export default new Unpause(
  new SlashCommandBuilder()
    .setName("unpause")
    .setNameLocalization("pt-BR", "despausar")
    .setDescription("Continues to play a song that was playing")
    .setDescriptionLocalization(
      "pt-BR",
      "Continua a tocar uma música que estava tocando"
    )
);

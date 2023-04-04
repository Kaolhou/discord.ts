import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command";
import { Main } from "../classes/Main";
import { LocaleResponses } from "../../types";

const RESPONSES: LocaleResponses = {
  noVoiceConnection: {
    "en-US": "No voice connection",
    "pt-BR": "Sem conexão de voz",
  },
  songUnpaused: {
    "en-US": "Song Paused",
    "pt-BR": "Música Pausada",
  },
};

class Unpause extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const connection = client.voiceConnections.get(interaction.guildId!);
    if (connection) {
      connection.unpause();
      interaction.editReply(
        RESPONSES.songUnpaused[interaction.locale] ||
          RESPONSES.songUnpaused["en-US"]
      );
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

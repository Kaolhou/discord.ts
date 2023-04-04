import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command";
import { Main } from "../classes/Main";
import { LocaleResponses } from "../../types";
import shuffleExceptFirst from "../../util/shuffleExceptFirst";

const RESPONSES: LocaleResponses = {
  noVoiceConnection: {
    "en-US": "No voice connection",
    "pt-BR": "Sem conexão de voz",
  },
  queueShuffled: {
    "en-US": "Queue shuffled",
    "pt-BR": "Fila embaralhada",
  },
};

class Unpause extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const connection = client.voiceConnections.get(interaction.guildId!);
    if (connection) {
      shuffleExceptFirst(connection.queue);
      interaction.editReply(
        RESPONSES.queueShuffled[interaction.locale] ||
          RESPONSES.queueShuffled["en-US"]
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
    .setName("shuffle")
    .setNameLocalization("pt-BR", "embaralhar")
    .setDescription("Shuffles a queue of songs")
    .setDescriptionLocalization("pt-BR", "Embaralha uma fila de musicas")
);

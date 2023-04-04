import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command";
import { Main } from "../classes/Main";
import { LocaleResponses } from "../../types";
import queueEmbed from "../embeds/queueEmbed";

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

class Queue extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const connection = client.voiceConnections.get(interaction.guildId!);
    if (connection) {
      interaction.editReply({
        embeds: [queueEmbed(connection.queue, interaction.locale)],
      });
    } else {
      interaction.editReply(
        RESPONSES.noVoiceConnection[interaction.locale] ||
          RESPONSES.noVoiceConnection["en-US"]
      );
    }
  }
}

export default new Queue(
  new SlashCommandBuilder()
    .setName("queue")
    .setDescription("Show the music queue")
    .setDescriptionLocalization("pt-BR", "Mostra a fila de músicas")
);

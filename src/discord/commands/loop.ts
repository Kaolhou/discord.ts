import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command.js";
import { Main } from "../classes/Main.js";
import type { loopToggle } from "../classes/Music.js";
import { LocaleResponses } from "../../types.js";
import format from "../../util/format.js";

const RESPONSES: LocaleResponses = {
  noVoiceConnection: {
    "pt-BR": "Loop definido para **`{0}`**",
    "en-US": "Loop defined to **`{0}`**",
  },
};

class Loop extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const prompt = interaction.options.getString("toggle", true) as loopToggle;
    const connection = client.voiceConnections.get(interaction.guildId!);
    if (connection) {
      connection.loopStatus = prompt;
      interaction.editReply(
        format(
          RESPONSES.noVoiceConnection[interaction.locale] ||
            RESPONSES.noVoiceConnection["en-US"],
          prompt
        )
      );
    } else {
      interaction.editReply(
        RESPONSES.noVoiceConnection[interaction.locale] ||
          RESPONSES.noVoiceConnection["en-US"]
      );
    }
  }
}

export default new Loop(
  new SlashCommandBuilder()
    .setName("loop")
    .setDescription("Define the loop music in queue")
    .setDescriptionLocalization("pt-BR", "Define o loop de música na fila")
    .addStringOption((option) =>
      option
        .setRequired(true)
        .setName("toggle")
        .setDescription("The loop toggle input")
        .setDescriptionLocalization("pt-BR", "O input de alternância do loop")
        .addChoices(
          {
            name: "all",
            name_localizations: {
              "pt-BR": "todos",
            },
            value: "all",
          },
          {
            name: "off",
            name_localizations: {
              "pt-BR": "desligado",
            },
            value: "off",
          },
          {
            name: "one",
            name_localizations: {
              "pt-BR": "um",
            },
            value: "one",
          }
        )
    )
);

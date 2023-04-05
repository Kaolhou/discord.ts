import { EmbedBuilder, LocaleString } from "discord.js";
import { SoundOptions } from "../classes/Music.js";
import { LocaleResponses } from "../../types.js";
import format from "../../util/format.js";

const RESPONSES: LocaleResponses = {
  noVoiceConnection: {
    "en-US": "No voice connection",
    "pt-BR": "Sem conexão de voz",
  },
  queue: {
    "en-US": "Queue",
    "pt-BR": "Fila",
  },
};

export function queueEmbed(queue: SoundOptions[], locale: LocaleString) {
  const embed = new EmbedBuilder();
  embed.setTitle(RESPONSES.queue[locale] || RESPONSES.queue["en-US"]);
  queue.forEach((item, index) => {
    if (index == 0) {
      embed.setDescription(format("`{0}`\n", item.title));
    } else {
      embed.setDescription(embed.data.description + "* " + item.title + "\n");
    }
  });

  return embed;
}

import { EmbedBuilder } from "@discordjs/builders";
import { LocaleResponses } from "../../types";
import { LocaleString } from "discord.js";
import format from "../../util/format";

const texts: LocaleResponses = {
  addedToQueue: {
    "en-US": "Playlist added to queue",
    "pt-BR": "Playlist adicionada a fila",
  },
  playlistMoreThan10: {
    "en-US": "{0}\n\nAnd more {1}",
    "pt-BR": "{0}\n\nE mais {1}",
  },
  requestedBy: {
    "en-US": "Requested by <@!{0}>",
    "pt-BR": "Solicitado por <@!{0}>",
  },
};

export function playlistEmbed(
  titles: string[],
  locale: LocaleString,
  author: string
) {
  const embed = new EmbedBuilder()
    .setTitle(texts.addedToQueue[locale] || texts.addedToQueue["en-US"])
    .setDescription(
      titles
        .slice(0, 10)
        .map((i) => "* " + i)
        .join("\n")
    );
  if (titles.length > 10) {
    embed.setDescription(
      format(
        texts.playlistMoreThan10[locale] || texts.playlistMoreThan10["en-US"],
        embed.data.description,
        titles.length - 10
      )
    );
  }
  embed.setDescription(
    embed.data.description +
      "\n" +
      format(texts.requestedBy[locale] || texts.requestedBy["en-US"], author)
  );

  return embed;
}

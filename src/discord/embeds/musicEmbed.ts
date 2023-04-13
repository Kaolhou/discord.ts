import { EmbedBuilder, LocaleString } from "discord.js";
import { YouTubeVideo } from "play-dl";
import { LocaleResponses } from "../../types.js";

const texts: LocaleResponses = {
  noDescription: {
    "en-US": "(No description were provided)",
    "pt-BR": "(Descrição não fornecida)",
  },
};

export function musicEmbed(locale: LocaleString, video_details: YouTubeVideo) {
  const embed = new EmbedBuilder()
    .setURL(video_details.url)
    .setAuthor({
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      name: video_details.channel?.name!,
      iconURL: video_details.channel?.iconURL(),
      url: video_details.channel?.url,
    })
    .setDescription(
      video_details.description == undefined
        ? texts.noDescription[locale] || texts.noDescription["en-US"]
        : video_details.description.substring(0, 250).length == 250
        ? video_details.description.substring(0, 250) + "..."
        : video_details.description
    )
    .setTitle(video_details.title!)
    .setThumbnail(video_details.thumbnails[0].url);

  return embed;
}

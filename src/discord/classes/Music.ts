import { stream, validate, playlist_info } from "play-dl";
import {
  createAudioPlayer,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  VoiceConnection,
  joinVoiceChannel,
  createAudioResource,
} from "@discordjs/voice";
import { Main } from "./Main.js";
import { CommandInteraction, GuildMember } from "discord.js";
import path from "path";
import { LocaleResponses } from "../../types.js";
import { playlistEmbed } from "../embeds/index.js";

export interface SoundOptions {
  link: string;
  title: string;
  requestedUserId: string;
  isLocal: boolean;
}

const RESPONSES: LocaleResponses = {
  unconnectedUser: {
    "pt-BR": "Você precisa estar conectado em um canal de voz",
    "en-US": "You must be connected in a voice channel",
  },
  unjoinableChannel: {
    "pt-BR": "Canal de voz inacessível",
    "en-US": "Unreachable voice channel",
  },
  queue: {
    "en-US": "Queue",
    "pt-BR": "Fila",
  },
  invalidLink: {
    "en-US": "Invalid URL",
    "pt-BR": "URL inválida",
  },
  invalidVideoType: {
    "en-US": "Invalid URL type, only Youtube videos or playlists accepted",
    "pt-BR":
      "Tipo de URL inválida, apenas aceitos vídeos ou playlists do Youtube",
  },
  someVideosAdded: {
    "en-US": "{0} Videos added to queue",
    "pt-BR": "{0} Vídeos adicionados à fila",
  },
};

export type loopToggle = "one" | "all" | "off";

export default class Music {
  public queue: SoundOptions[] = [];
  private player = createAudioPlayer();
  public loopStatus: loopToggle = "off";
  private mediaFolder = path.resolve(process.cwd(), "src", "media", "audios");
  public connection: VoiceConnection | undefined;
  public channel = "";
  public isPlaying = false;
  guild;
  client;
  guildId;
  constructor(client: Main, interaction: CommandInteraction) {
    this.client = client;
    this.guild = client.guilds.cache.get(interaction.guildId!);
    this.guildId = interaction.guildId;
    this.channel = interaction.channelId;
    this.connect(interaction);
    this.loadEvents();
  }

  async addToQueue(
    interaction: CommandInteraction,
    link: string,
    isLocal = false,
    message?: string
  ) {
    if (isLocal) {
      if (!message) return;
      this.queue.push({
        isLocal,
        link,
        requestedUserId: interaction.user.id,
        title: link,
      });
      interaction.editReply({
        content: message,
      });
    } else {
      const valid = await validate(link);

      if (valid == false) {
        await interaction.editReply(
          RESPONSES.invalidLink[interaction.locale] ||
            RESPONSES.invalidLink["en-US"]
        );
      } else if (valid === "yt_playlist") {
        const searchedPlaylist = await playlist_info(link, {
          incomplete: true,
        });
        const videos = await searchedPlaylist.all_videos();

        videos.forEach((i) => {
          this.queue.push({
            isLocal,
            link: i.url,
            requestedUserId: interaction.user.id,
            title: i.title!,
          });
        });

        await interaction.editReply({
          embeds: [
            playlistEmbed(
              videos.map((i) => i.title!),
              interaction.locale,
              interaction.user.id
            ),
          ],
        });
      } else if (valid === "yt_video") {
        this.queue.push({
          isLocal,
          link,
          requestedUserId: interaction.user.id,
          title: link,
        });
        interaction.editReply({
          content:
            RESPONSES.queue[interaction.locale] || RESPONSES.queue["en-US"],
        });
      } else {
        await interaction.editReply(
          RESPONSES.invalidVideoType[interaction.locale] ||
            RESPONSES.invalidVideoType["en-US"]
        );
        return;
      }
    }
  }

  async next() {
    this.player.stop();
    this.isPlaying = false;
    this.queue.shift();
    await this.playMusic();
  }

  pause() {
    this.player.pause();
    this.isPlaying = false;
  }

  unpause() {
    this.player.unpause();
    this.isPlaying = true;
  }

  public async playMusic() {
    const current_item = this.queue[0];

    if (current_item.isLocal) {
      this.player.play(
        createAudioResource(path.resolve(this.mediaFolder, current_item.link))
      );
    } else {
      const video = await stream(current_item.link);
      this.player.play(
        createAudioResource(video.stream, {
          inputType: video.type,
        })
      );
    }

    this.connection?.subscribe(this.player);
    this.isPlaying = true;
  }

  // isConnected() {}

  private connect(interaction: CommandInteraction) {
    const member = interaction.guild?.members.cache.get(interaction.user.id);
    if (this.isUserConnected(member)) {
      if (member?.voice.channel?.joinable) {
        this.connection = joinVoiceChannel({
          guildId: this.guild!.id,
          channelId: member.voice.channelId!,
          adapterCreator: this.guild!.voiceAdapterCreator,
        });
        this.client.voiceConnections.set(interaction.guildId!, this);
        this.client.logger.info(
          `Voice connection created at ${interaction.guildId}`
        );
      } else {
        interaction.editReply(
          RESPONSES.unjoinableChannel[interaction.locale] ||
            RESPONSES.unjoinableChannel["en-US"]
        );
      }
    } else {
      interaction.editReply(
        RESPONSES.unconnectedUser[interaction.locale] ||
          RESPONSES.unconnectedUser["en-US"]
      );
    }
  }

  private isUserConnected(member: GuildMember | undefined) {
    return !!member?.voice.channel?.id;
  }

  private loadEvents() {
    this.connection!.on(VoiceConnectionStatus.Disconnected, () => {
      this.player.stop();
      this.queue.slice(0, 0);
      this.client.voiceConnections.delete(this.guildId!);
    });
    this.player.on(AudioPlayerStatus.Idle, () => {
      switch (this.loopStatus) {
        case "off":
          this.queue.shift();
          break;
        case "all":
          this.queue.push(this.queue.shift()!);
          break;
        case "one":
          break;
      }
    });
  }
}

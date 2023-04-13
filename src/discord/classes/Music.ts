import { stream, validate, playlist_info, video_basic_info } from "play-dl";
import {
  createAudioPlayer,
  AudioPlayerStatus,
  VoiceConnectionStatus,
  VoiceConnection,
  joinVoiceChannel,
  createAudioResource,
} from "@discordjs/voice";
import { Main } from "./Main.js";
import { CommandInteraction, GuildMember, LocaleString } from "discord.js";
import path from "path";
import { LocaleResponses } from "../../types.js";
import { musicEmbed, playlistEmbed } from "../embeds/index.js";

export interface SoundOptions {
  link: string;
  title: string;
  requestedUserId: string;
  isLocal: boolean;
}

const RESPONSES: LocaleResponses = {
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
  disconnectedDueAfk: {
    "en-US": "Disconnected due inactivity",
    "pt-BR": "Desconectado por inatividade",
  },
  addedToQueue: {
    "en-US": "Music added to queue",
    "pt-BR": "Música adicionada à fila",
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
  private timeout: ReturnType<typeof setTimeout> | null;
  locale: LocaleString;
  guild;
  client;
  guildId;
  constructor(client: Main, interaction: CommandInteraction) {
    this.client = client;
    this.guild = client.guilds.cache.get(interaction.guildId!);
    this.guildId = interaction.guildId;
    this.channel = interaction.channelId;
    this.locale = interaction.locale;
    this.connect(interaction);
    this.timeout = this.initTimeout();
  }

  disconnect() {
    this.connection?.disconnect();
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
            title: i.title!,
            link: i.url,
            requestedUserId: interaction.user.id,
            isLocal,
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
        const { video_details } = await video_basic_info(link);
        this.queue.push({
          title: link,
          link,
          requestedUserId: interaction.user.id,
          isLocal,
        });
        interaction.editReply({
          content:
            RESPONSES.addedToQueue[interaction.locale] ||
            RESPONSES.addedToQueue["en-US"],
          embeds: [musicEmbed(interaction.locale, video_details)],
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
    //todo arrumar função next, quando loopStatus está em all, não funciona como deveria
    this.player.stop();
    this.isPlaying = false;
    if (!(this.loopStatus == "all")) {
      this.queue.shift();
    }
    await this.playMusic();
    return this.queue[0];
  }

  pause() {
    if (this.player.state.status == AudioPlayerStatus.Playing) {
      this.player.pause();
      this.timeout = this.initTimeout();
      this.isPlaying = false;
      return true;
    }
    return false;
  }

  unpause() {
    const status = this.player.state.status;
    if (
      status == AudioPlayerStatus.Paused ||
      status == AudioPlayerStatus.AutoPaused
    ) {
      this.player.unpause();
      clearTimeout(this.timeout || undefined);
      this.isPlaying = true;
      return true;
    }
    return false;
  }

  public async playMusic() {
    clearTimeout(this.timeout || undefined);
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
        this.loadEvents();
      } else {
        interaction.editReply(
          RESPONSES.unjoinableChannel[interaction.locale] ||
            RESPONSES.unjoinableChannel["en-US"]
        );
      }
    } else {
      return;
    }
  }

  public isUserConnected(member: GuildMember | undefined) {
    return !!member?.voice.channel?.id;
  }

  private initTimeout() {
    return setTimeout(async () => {
      const channel = this.client.channels.cache.get(this.channel);
      this.disconnect();
      channel?.isTextBased() &&
        (await channel?.send(
          RESPONSES.disconnectedDueAfk[this.locale] ||
            RESPONSES.disconnectedDueAfk["en-US"]
        ));
    }, 5 * 60 * 1000);
  }

  private loadEvents() {
    this.connection!.on(VoiceConnectionStatus.Disconnected, () => {
      this.client.logger.info("Disconnected at " + this.guildId);
      this.player.stop();
      this.queue.slice(0, 0);
      this.client.voiceConnections.delete(this.guildId!);
      this.client.voiceConnections.get(this.guildId!);
    });
    this.player.on(AudioPlayerStatus.Idle, () => {
      this.timeout = this.initTimeout();
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

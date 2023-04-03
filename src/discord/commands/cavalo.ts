import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command";
import { Main } from "../classes/Main";
import Music from "../classes/Music";

class Cavalo extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    let connection = client.voiceConnections.get(interaction.guildId!);

    //se não houver uma conexão de voz, então ela é feita, caso tenha, então apenas adiciona a música na fila
    if (connection) {
      if (connection.queue.length == 0) {
        await connection.addToQueue(interaction, "cavalo.mp3", true);
        connection.playMusic();
      } else {
        await connection.addToQueue(interaction, "cavalo.mp3", true);
      }
    } else {
      connection = new Music(client, interaction);

      await connection.addToQueue(interaction, "cavalo.mp3", true);

      connection.playMusic();
    }
  }
}

export default new Cavalo(
  new SlashCommandBuilder()
    .setName("cavalo")
    .setDescription("Plays all Ratinho's sound effects")
    .setDescriptionLocalization(
      "pt-BR",
      "Toca todos os efeitos sonoros do Ratinho"
    )
);

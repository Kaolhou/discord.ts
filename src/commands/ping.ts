import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Main from "../classes/Main";
import Command from "../classes/base/Command";

class Ping extends Command {
  async execute(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    await interaction.editReply(`PONG: ${client.ws.ping}ms`);
  }
}

export default new Ping(
  new SlashCommandBuilder().setName("ping").setDescription("pong")
);

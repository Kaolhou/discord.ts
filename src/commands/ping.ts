import {
  type ChatInputCommandInteraction,
  type CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../structures/Command";
import type Bot from "../structures/Bot";

class Ping extends Command {
  public perms = [];
  async execute(
    client: Bot,
    interaction: ChatInputCommandInteraction<CacheType>
  ) {
    console.log(client.locales.get("namespace.test", interaction.locale));
    return interaction.editReply(
      `PONG\n${
        client.ws.ping == -1 ? "**Calculating ping...**" : `${client.ws.ping}ms`
      }`
    );
  }
  data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("replies with pong");
}
export default new Ping();

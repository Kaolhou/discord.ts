import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import Main from "../../classes/Main";
import Command from "../../classes/base/Command";
import log from "./log";

type Subcommands = "log";
class Config extends Command {
  async execute(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const subcommand = interaction.options.getSubcommand() as Subcommands;
    switch (subcommand) {
      case "log":
        log.execute(client, interaction);
        break;
      default:
        await interaction.editReply("algo houve de errado");
    }
  }
}

export default new Config(
  new SlashCommandBuilder()
    .setName("config")
    .setDescription("configure the server")
    .addSubcommand(<SlashCommandSubcommandBuilder>log.data)
);

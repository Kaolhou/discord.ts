import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
  PermissionResolvable,
  SlashCommandSubcommandBuilder,
} from "discord.js";
import Main from "../../classes/Main";
import Command from "../../classes/base/Command";
import random from "./random";

type Subcommands = "random";
class Meme extends Command {
  async execute(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const subcommand = interaction.options.getSubcommand() as Subcommands;
    switch (subcommand) {
      case "random":
        random.execute(client, interaction);
        break;
      default:
        await interaction.editReply("algo houve de errado");
    }
  }
}

export default new Meme(
  new SlashCommandBuilder()
    .setName("meme")
    .setDescription("envia um meme")
    .addSubcommand(<SlashCommandSubcommandBuilder>random.data)
);

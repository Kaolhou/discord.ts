import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
  PermissionResolvable,
} from "discord.js";
import Main from "../classes/Main";
import Command from "../classes/base/Command";
import path from "path";

class Meme extends Command {
  async execute(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const random_meme = path.resolve(
      process.env.MEMES_PATH,
      (await client.prisma.meme.findMany()).sort(() => 0.5 - Math.random())[0]
      .nome
      );
      client.logger.debug(random_meme)
    await interaction.editReply({
      files: [random_meme],
    });
  }
}

export default new Meme(
  new SlashCommandBuilder().setName("meme").setDescription("envia um meme"),
  ['UseApplicationCommands'] as PermissionResolvable[]
);

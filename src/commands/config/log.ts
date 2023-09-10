import {
  ChatInputCommandInteraction,
  CacheType,
  PermissionResolvable,
  SlashCommandSubcommandBuilder,
  ChannelType,
} from "discord.js";
import Command from "../../classes/base/Command";
import Main from "../../classes/Main";

class Log extends Command {
  async execute(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const channel = interaction.options.getChannel("channel", false);
    await client.prisma.guild.update({
      where: {
        guildId: interaction.guild?.id,
      },
      data: {
        logChannel: channel == null ? null : channel.id,
      },
    });
    await interaction.editReply(
      `canal de logs modificado para: ${
        "<#" + channel?.id + ">" ?? "undefined"
      }`
    );
  }
  perms = <PermissionResolvable[]>["ManageChannels"];
}

export default new Log(
  new SlashCommandSubcommandBuilder()
    .setName("log")
    .setDescription("set the log channel")
    .addChannelOption((input) =>
      input
        .setName("channel")
        .setDescription("the channel for logs")
        .setRequired(false)
        .addChannelTypes(ChannelType.GuildText)
    )
);

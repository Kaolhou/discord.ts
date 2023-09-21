import { SlashCommandSubcommandBuilder, ChannelType, } from "discord.js";
import Command from "../../classes/base/Command";
class Log extends Command {
    constructor() {
        super(...arguments);
        this.perms = ["ManageChannels"];
    }
    async execute(client, interaction) {
        const channel = interaction.options.getChannel("channel", false);
        await client.prisma.guild.update({
            where: {
                guildId: interaction.guild?.id,
            },
            data: {
                logChannel: channel == null ? null : channel.id,
            },
        });
        await interaction.editReply(`canal de logs modificado para: ${"<#" + channel?.id + ">" ?? "undefined"}`);
    }
}
export default new Log(new SlashCommandSubcommandBuilder()
    .setName("log")
    .setDescription("set the log channel")
    .addChannelOption((input) => input
    .setName("channel")
    .setDescription("the channel for logs")
    .setRequired(false)
    .addChannelTypes(ChannelType.GuildText)));

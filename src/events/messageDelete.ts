import { EmbedBuilder, Message, PartialMessage } from "discord.js";
import Main from "../classes/Main";
import Event from "../classes/base/Event";

class MessageDelete extends Event<"messageDelete"> {
  public once = false;
  public async exe(
    client: Main,
    message: Message<boolean> | PartialMessage
  ): Promise<void> {
    try {
      console.log("skdjfhskfhj");
      if (message.partial) {
        message = (await message.fetch().catch(console.error)) ?? message;
      }

      const guild = await client.prisma.guild.findUniqueOrThrow({
        where: {
          guildId: message.guildId!,
        },
      });

      if (guild.logChannel) {
        const channel = client.channels.cache.get(guild.logChannel);
        if (!channel) throw new Error("no channel found");
        if (!channel.isTextBased()) throw new Error("channel is not text");

        const embed = new EmbedBuilder()
          .setColor("Red")
          .setTitle(`mensagem apagada de ${message.author?.id}`)
          .setDescription(message.content);

        await channel.send({
          embeds: [embed],
        });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

export default new MessageDelete("messageDelete");

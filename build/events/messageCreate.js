import Event from "../classes/base/Event";
class MessageCreate extends Event {
    async exe(client, message) {
        if (message.author.bot)
            return;
        if (message.inGuild()) {
            client.logger.debug(`[${message.author.id}] - ${message.content}`);
            const userExists = (await client.prisma.guildUserMember.findUnique({
                where: {
                    guildId_userId: {
                        userId: message.author.id,
                        guildId: message.guildId
                    }
                },
            }));
            if (!userExists) {
                try {
                    await client.prisma.user.create({
                        data: {
                            userId: message.author.id
                        }
                    });
                }
                catch (error) {
                }
                finally {
                    await client.prisma.guildUserMember.create({
                        data: {
                            guildId: message.guild.id,
                            userId: message.author.id
                        }
                    });
                }
            }
            const { messages } = await client.prisma.user.update({
                where: {
                    userId: message.author.id
                },
                data: {
                    messages: {
                        increment: 1
                    }
                },
                select: {
                    messages: true
                }
            });
            if (messages == 15n) {
                const channel = client.channels.cache.get(message.channelId);
                channel?.isTextBased() ? await channel.send(`beleza ${message.author.toString()}, mandou 15 mensagem, chatão em menó\nsó fala, eu hein`) : null;
            }
        }
    }
}
export default new MessageCreate('messageCreate');

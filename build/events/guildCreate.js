import Event from "../classes/base/Event";
class GuildCreate extends Event {
    async exe(client, guild) {
        await client.prisma.guild.create({
            data: {
                guildId: guild.id,
            },
        });
    }
}
export default new GuildCreate("guildCreate");

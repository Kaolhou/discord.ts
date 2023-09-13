import { Guild } from "discord.js";
import Main from "../classes/Main";
import Event from "../classes/base/Event";

class GuildCreate extends Event<"guildCreate"> {
  public async exe(client: Main, guild: Guild): Promise<void> {
    await client.prisma.guild.create({
      data: {
        guildId: guild.id,
      },
    });
  }
}

export default new GuildCreate("guildCreate");

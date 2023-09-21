import { Guild } from "discord.js";
import Main from "../classes/Main";
import Event from "../classes/base/Event";
declare class GuildCreate extends Event<"guildCreate"> {
    exe(client: Main, guild: Guild): Promise<void>;
}
declare const _default: GuildCreate;
export default _default;

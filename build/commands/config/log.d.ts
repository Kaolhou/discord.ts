import { ChatInputCommandInteraction, CacheType, PermissionResolvable } from "discord.js";
import Command from "../../classes/base/Command";
import Main from "../../classes/Main";
declare class Log extends Command {
    execute(client: Main, interaction: ChatInputCommandInteraction<CacheType>): Promise<void>;
    perms: PermissionResolvable[];
}
declare const _default: Log;
export default _default;

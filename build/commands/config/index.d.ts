import { ChatInputCommandInteraction, CacheType } from "discord.js";
import Main from "../../classes/Main";
import Command from "../../classes/base/Command";
declare class Config extends Command {
    execute(client: Main, interaction: ChatInputCommandInteraction<CacheType>): Promise<void>;
}
declare const _default: Config;
export default _default;

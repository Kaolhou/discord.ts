import { ChatInputCommandInteraction, CacheType } from "discord.js";
import Command from "../../classes/base/Command";
import Main from "../../classes/Main";
declare class Games extends Command {
    executar(client: Main, interaction: ChatInputCommandInteraction<CacheType>): Promise<void>;
}
declare const _default: Games;
export default _default;

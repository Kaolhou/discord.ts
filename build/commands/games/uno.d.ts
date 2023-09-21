import { ChatInputCommandInteraction, CacheType } from "discord.js";
import Command from "../../classes/base/Command";
import Main from "../../classes/Main";
declare class Uno extends Command {
    executar(client: Main, interaction: ChatInputCommandInteraction<CacheType>): Promise<void>;
}
declare const _default: Uno;
export default _default;

import { CacheType, ChatInputCommandInteraction } from "discord.js";
import Command from "../classes/base/Command";
import Main from "../classes/Main";
declare class Termos extends Command {
    execute(client: Main, interaction: ChatInputCommandInteraction<CacheType>): Promise<void>;
}
declare const _default: Termos;
export default _default;

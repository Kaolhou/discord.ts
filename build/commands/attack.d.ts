import { ChatInputCommandInteraction, CacheType } from "discord.js";
import Main from "../classes/Main";
import Command from "../classes/base/Command";
declare class Attack extends Command {
    externalGifs: string[];
    execute(client: Main, interaction: ChatInputCommandInteraction<CacheType>): Promise<void>;
}
declare const _default: Attack;
export default _default;

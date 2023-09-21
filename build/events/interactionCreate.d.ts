import { Interaction, CacheType } from "discord.js";
import Main from "../classes/Main";
import Event from "../classes/base/Event";
declare class InteractionCreate extends Event<"interactionCreate"> {
    exe(client: Main, interaction: Interaction<CacheType>): Promise<void>;
}
declare const _default: InteractionCreate;
export default _default;

import { Message, PartialMessage } from "discord.js";
import Main from "../classes/Main";
import Event from "../classes/base/Event";
declare class MessageDelete extends Event<"messageDelete"> {
    once: boolean;
    exe(client: Main, message: Message<boolean> | PartialMessage): Promise<void>;
}
declare const _default: MessageDelete;
export default _default;

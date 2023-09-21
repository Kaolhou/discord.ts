import { Message } from "discord.js";
import Main from "../classes/Main";
import Event from "../classes/base/Event";
declare class MessageCreate extends Event<'messageCreate'> {
    exe(client: Main, message: Message<boolean>): Promise<void>;
}
declare const _default: MessageCreate;
export default _default;

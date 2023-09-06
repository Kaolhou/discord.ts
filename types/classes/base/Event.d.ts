import type { ClientEvents } from "discord.js";
import Main from "../Main";
export default class Event<T extends keyof ClientEvents> {
    once: boolean;
    eventName: T;
    constructor(event: T, once?: boolean);
    exe(client: Main, ...args: ClientEvents[T]): void | Promise<void>;
}

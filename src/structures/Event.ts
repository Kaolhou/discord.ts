import type { ClientEvents } from "discord.js";
import Bot from "./Bot.js";

export abstract class Event<T extends keyof ClientEvents> {
  constructor(public eventName: T, public once = false) {}
  public abstract execute(
    client: Bot,
    ...args: ClientEvents[T]
  ): Promise<unknown>;
}

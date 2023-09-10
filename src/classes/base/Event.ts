import type { ClientEvents } from "discord.js";
import Main from "../Main";

export default class Event<T extends keyof ClientEvents> {
  public once: boolean;
  public eventName: T;
  constructor(event: T, once = false) {
    this.once = once;
    this.eventName = event;
  }
  public async exe(client: Main, ...args: ClientEvents[T]): Promise<void> {
    throw new Error("Not Implemented");
  }
}

import { Main } from "../Main";
import type { ClientEvents } from "discord.js";

export default class Event<T extends keyof ClientEvents> {
  public eventName: T;
  public once = false;

  constructor(eventName: T) {
    this.eventName = eventName;
  }

  public executar(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    client: Main,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ...args: ClientEvents[T]
  ): any | Promise<any> {
    throw new Error(
      "Método executar deve ser implementado na classe derivada."
    );
  }
}

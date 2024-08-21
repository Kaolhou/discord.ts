import { Client } from "discord.js";
import { Collection, type ClientOptions } from "discord.js";
import events from "../events";
import type Command from "./Command";
import Locales from "./Locales";
import en from "../locales/en.json";
import pt from "../locales/pt.json";
interface BotProps extends ClientOptions {}

export default class Bot extends Client {
  public commands = new Collection<string, Command>();
  public locales = new Locales([
    ["en", en],
    ["pt", pt],
  ]);

  constructor(options: BotProps) {
    super(options);
  }

  loadEvents() {
    for (let { eventName, execute, once } of events) {
      once
        ? this.once(eventName, execute.bind(null, this))
        : this.on(eventName, execute.bind(null, this));
      console.log(
        `[event] ${once ? "once" : "on"} - ${eventName} successfully loaded`
      );
    }
  }

  initialize(token: string) {
    this.loadEvents();
    this.login(token);
    return this;
  }
}

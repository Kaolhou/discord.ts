import { Client, ClientOptions, Collection } from "discord.js";
import events from "../events/index.ts";
import Logger from "./Logger.ts";
import { PrismaClient } from "@prisma/client";
import Command from "./base/Command.ts";

interface MainI {
  logger: Logger;
  prisma: PrismaClient;
  initialize: (token: string) => void;
  loadEvents: () => void;
}

interface Options extends ClientOptions {
  logger: Logger;
  prisma: PrismaClient;
  memesPath: string;
}

export default class Main extends Client implements MainI {
  private memesPath;
  public commands = new Collection<string, Command>();

  logger: Logger;
  prisma: PrismaClient;
  constructor(options: Options) {
    super(options);
    this.logger = options.logger;
    this.prisma = options.prisma;
    this.memesPath = options.memesPath;
  }

  private loadMemes(path: string) {
    if (!path) throw new Error("path to memes not provided");
    this.logger.warn(path);
  }

  loadEvents() {
    for (let event of events) {
      if (event.once) this.once(event.eventName, event.exe.bind(null, this));
      else this.on(event.eventName, event.exe.bind(null, this));
      this.logger.info(`[main] event: ${event.eventName} successfully loaded`);
    }
  }

  initialize(token: string) {
    this.loadEvents();
    this.login(token);
    this.loadMemes(this.memesPath);
  }
}

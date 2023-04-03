import { Client, Collection } from "discord.js";
import type { ClientOptions } from "discord.js";
import events from "../events";
import Command from "./bases/Command";
import { Logger } from "pino";
import { PrismaClient } from "@prisma/client";
import Music from "./Music";

interface Options extends ClientOptions {
  logger: Logger;
  prisma: PrismaClient;
}
export class Main extends Client {
  commands = new Collection<string, Command>();
  voiceConnections = new Collection<string, Music>();
  logger: Logger;
  prisma: PrismaClient;

  constructor(options: Options) {
    super(options);
    this.logger = options.logger;
    this.prisma = options.prisma;
  }

  async loadEvents() {
    events.forEach((event) => {
      if (event.once)
        this.once(event.eventName, event.executar.bind(null, this));
      else this.on(event.eventName, event.executar.bind(null, this));
      this.logger.info(
        "\x1b[33m%s\x1b[0m",
        `[events] ${event.eventName} loaded`
      );
    });
    this.logger.info("\x1b[32m%s\x1b[0m", `[events] all events loaded`);
  }

  async initialize(token: string) {
    await this.loadEvents();

    this.login(token);
  }
}

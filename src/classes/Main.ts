import { Client, ClientOptions, Collection } from "discord.js";
import events from "../events/index.ts";
import Logger from "./Logger";
import { PrismaClient } from "@prisma/client";
import Command from "./base/Command";
import path from "path";
import fs from "fs";

interface MainI {
  logger: Logger;
  prisma: PrismaClient;
  debug: boolean;
  initialize: (token: string) => void;
  loadEvents: () => void;
}

interface Options extends ClientOptions {
  logger: Logger;
  prisma: PrismaClient;
  memesPath: string;
  debug: boolean;
}

export default class Main extends Client implements MainI {
  private memesPath;
  public commands = new Collection<string, Command>();
  public debug;

  logger: Logger;
  prisma: PrismaClient;
  constructor(options: Options) {
    super(options);
    this.logger = options.logger;
    this.prisma = options.prisma;
    this.memesPath = options.memesPath;
    this.debug = options.debug;
  }

  private async loadMemes(pathMeme: string) {
    if (!pathMeme) throw new Error("path to memes not provided");
    const files = fs.readdirSync(pathMeme);

    files.forEach((i) => {
      let count = 0;
      if (i.endsWith(".jfif")) {
        count++;
        fs.renameSync(
          path.resolve(this.memesPath, i),
          path.resolve(this.memesPath, i.slice(0, -4) + ".jpeg")
        );
      }
      if (count != 0) this.logger.info(`[main] ${count} jfifs converted`);
    });

    var memes = await this.prisma.meme.createMany({
      data: files.map((i) => ({ dailyPublished: false, nome: i, nsfw: false })),
      skipDuplicates: true,
    });
    this.logger.info(`rows: ${memes.count} added`);

    const data = await this.prisma.meme.findMany();

    const toDelete = data
      .filter((i) => !files.find((j) => j == i.nome))
      .map((i) => i.nome);

    memes = await this.prisma.meme.deleteMany({
      where: {
        nome: {
          in: toDelete,
        },
      },
    });
    this.logger.info(`rows: ${memes.count} deleted`);

    this.logger.info("\x1b[33mAll memes up to date\x1b[0m");
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

import "dotenv/config";
import { Main } from "./discord/classes/Main.js";
import logger from "./util/logger.js";
import prisma from "./util/prisma.js";

new Main({
  intents: [
    "Guilds",
    "GuildMessages",
    "GuildMessageReactions",
    "GuildVoiceStates",
    "DirectMessages",
    "DirectMessageReactions",
  ],
  logger,
  prisma,
}).initialize(process.env!.TOKEN!);

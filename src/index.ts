import "dotenv/config";
import { Main } from "./discord/classes/Main";
import logger from "./util/logger";
import prisma from "./util/prisma";

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

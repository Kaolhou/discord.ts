import Logger from "./classes/Logger.ts";
import Main from "./classes/Main.ts";
import { config } from "dotenv";
import { PrismaClient } from "@prisma/client";

config();

new Main({
  intents: [
    "MessageContent",
    "DirectMessages",
    "GuildBans",
    "GuildInvites",
    "GuildMembers",
    "GuildMessages",
    "GuildModeration",
    "GuildVoiceStates",
    "AutoModerationConfiguration",
    "AutoModerationExecution",
    "GuildMessageReactions",
  ],
  logger: new Logger(),
  prisma: new PrismaClient(),
  memesPath: process.env.MEMES_PATH,
}).initialize(process.env.TOKEN);

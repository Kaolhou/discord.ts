import Logger from "./classes/Logger";
import Main from "./classes/Main";
import { PrismaClient } from "@prisma/client";
import { Partials } from "discord.js";

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

  partials: [Partials.Message, Partials.User, Partials.Channel],
  logger: new Logger(),
  prisma: new PrismaClient(),
  memesPath: process.env.MEMES_PATH,
  debug: process.argv.includes("-Debug"),
}).initialize(process.env.TOKEN);

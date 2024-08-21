import Bot from "./structures/Bot";

new Bot({
  intents: [
    "MessageContent",
    "Guilds",
    "GuildMessages",
    "GuildVoiceStates",
    "DirectMessages",
    "GuildPresences",
  ],
}).initialize(process.env.DISCORD_KEY!);

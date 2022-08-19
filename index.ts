import Bot from "./structures/Bot";
import { Intents } from "discord.js";

const bot = new Bot({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    partials:["MESSAGE", "CHANNEL", "REACTION"]
})
// bot.start()

import Bot from "./structures/Bot";
import { Intents } from "discord.js";

const bot = new Bot({
    intents:[
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
    partials:["MESSAGE", "CHANNEL", "REACTION"]
})
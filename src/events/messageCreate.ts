import type { Message } from "discord.js";
import type Bot from "../structures/Bot";
import { Event } from "../structures/Event";

class MessageCreate extends Event<"messageCreate"> {
  public async execute(client: Bot, message: Message<boolean>) {
    // if (message.author.bot) return;
    // const channel = client.channels.cache.get(message.channelId);
    // if (channel) {
    //   channel.isTextBased() ? channel.send(message.content) : "bruh";
    // }
  }
}

export default new MessageCreate("messageCreate");

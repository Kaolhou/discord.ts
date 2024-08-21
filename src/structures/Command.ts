import type {
  CacheType,
  ChatInputCommandInteraction,
  PermissionResolvable,
  SlashCommandBuilder,
} from "discord.js";
import type Bot from "./Bot";

export default abstract class Command {
  abstract execute(
    client: Bot,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<unknown>;
  abstract data: SlashCommandBuilder;
  abstract perms: PermissionResolvable[];
}

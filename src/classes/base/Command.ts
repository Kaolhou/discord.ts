import {
  ChatInputCommandInteraction,
  PermissionResolvable,
  SlashCommandBuilder,
} from "discord.js";
import Main from "../Main";

export default abstract class Command {
  constructor(
    public data: SlashCommandBuilder,
    public perms?: PermissionResolvable[]
  ) {}
  async execute(
    client: Main,
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    throw new Error("not Implemented");
  }
}

import {
  ChatInputCommandInteraction,
  PermissionResolvable,
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import Main from "../Main";

export default abstract class Command {
  //todo dm
  constructor(
    public data:
      | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
      | SlashCommandSubcommandBuilder
      | SlashCommandSubcommandsOnlyBuilder,
    public perms?: PermissionResolvable[]
  ) {}
  async execute(
    client: Main,
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    throw new Error("not Implemented");
  }
}

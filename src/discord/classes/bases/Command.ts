import { Main } from "../Main.js";
import type {
  ChatInputCommandInteraction,
  PermissionResolvable,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";

export default class Command {
  public acceptDM = false;

  constructor(
    public data:
      | SlashCommandBuilder
      | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
      | SlashCommandSubcommandsOnlyBuilder,
    public perms?: PermissionResolvable[]
  ) {}

  public async executar(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    client: Main,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interaction: ChatInputCommandInteraction
  ): Promise<void> {
    throw new Error(
      "Método executar deve ser implementado na classe derivada."
    );
  }
}

import { ChatInputCommandInteraction, PermissionResolvable, SlashCommandBuilder, SlashCommandSubcommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import Main from "../Main";
export default abstract class Command {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandBuilder | SlashCommandSubcommandsOnlyBuilder;
    perms?: PermissionResolvable[] | undefined;
    constructor(data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandBuilder | SlashCommandSubcommandsOnlyBuilder, perms?: PermissionResolvable[] | undefined);
    execute(client: Main, interaction: ChatInputCommandInteraction): Promise<void>;
}

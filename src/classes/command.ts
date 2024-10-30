import {
	CommandInteraction,
	PermissionResolvable,
	SlashCommandBuilder,
	SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import CustomClient from './custom-client';

export default abstract class Command {
	async execute(client: CustomClient, interaction: CommandInteraction): Promise<any> {
		throw new Error('You must implement this method');
	}
	abstract data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
	perms: PermissionResolvable[] = [];
}

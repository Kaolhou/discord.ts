import { CommandInteraction, PermissionResolvable, SlashCommandBuilder } from 'discord.js';
import CustomClient from './custom-client';

export default abstract class Command {
	constructor(public commandName: string) {}
	async execute(client: CustomClient, interaction: CommandInteraction) {
		throw new Error('You must implement this method');
	}
	abstract data: SlashCommandBuilder;
	perms: PermissionResolvable[] = [];
}

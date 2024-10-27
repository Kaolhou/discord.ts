import { SlashCommandBuilder, ClientEvents } from 'discord.js';
import CustomClient from './custom-client';

export default abstract class Event<T extends keyof ClientEvents> {
	constructor(public eventName: T, public once = false) {}
	async execute(client: CustomClient, ...args: ClientEvents[T]) {
		throw new Error('You must implement this class');
	}
}

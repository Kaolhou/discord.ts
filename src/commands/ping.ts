import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Command from '../classes/command';
import CustomClient from '../classes/custom-client';
import locales from '../classes/locales';

class Ping extends Command {
	async execute(client: CustomClient, interaction: ChatInputCommandInteraction) {
		interaction.editReply(`PONG🏓🏓\n${client.ws.ping}ms`);
	}
	public data = new SlashCommandBuilder()
		.setName('ping')
		.setDescription(locales.get('commands.ping.description', 'en-US'))
		.setDescriptionLocalizations(locales.getAllButEnglish('commands.ping.description'));
}

export default new Ping();

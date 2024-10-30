import { CacheType, SlashCommandBuilder, ChatInputCommandInteraction } from 'discord.js';
import Command from '../classes/command';
import CustomClient from '../classes/custom-client';
import { randomMeme } from './meme/random';

class Meme extends Command {
	async execute(client: CustomClient, interaction: ChatInputCommandInteraction<CacheType>) {
		switch (interaction.options.getSubcommand()) {
			case 'random':
				randomMeme(client, interaction);
				break;
			default:
				break;
		}
	}
	data = new SlashCommandBuilder()
		.setName('meme')
		.setDescription('Send a meme from my library')
		.addSubcommand((sc) =>
			sc
				.setName('random')
				.setDescription('Send a random meme from my library')
				.addUserOption((uo) => uo.setName('mention').setDescription('Mentioned user'))
		);
}

export default new Meme();

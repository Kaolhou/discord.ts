import { Interaction, CacheType } from 'discord.js';
import CustomClient from '../classes/custom-client';
import Event from '../classes/event';

class InteractionCreate extends Event<'interactionCreate'> {
	async execute(client: CustomClient, interaction: Interaction<CacheType>) {
		if (interaction.isCommand()) {
			await interaction.deferReply();
			const payload =
				client.commands.get(interaction.commandName) ??
				function () {
					const error = new Error(`[ERROR] Couldn't find ${interaction.commandName}`);
					client.emit('error', error);
					console.error(error.message);
				};
			payload(client, interaction);
		}
	}
}

export default new InteractionCreate('interactionCreate');

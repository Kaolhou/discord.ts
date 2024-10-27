import { REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';
import CustomClient from '../classes/custom-client';
import Event from '../classes/event';
import commands from '../commands';

class Ready extends Event<'ready'> {
	async execute(client: CustomClient) {
		const commandsJson: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
		const rest = new REST().setToken(process.env.DISCORD_KEY!);

		commands.forEach((command) => {
			commandsJson.push(command.data.toJSON());
			client.commands.set(command.commandName, command.execute);
			console.debug(`[command] ${command.data.name} loaded`);
		});

		await rest.put(Routes.applicationCommands(process.env.APP_ID!), {
			body: commandsJson,
		});
	}
}

export default new Ready('ready', true);

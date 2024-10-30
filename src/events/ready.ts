import {
	ActivityType,
	REST,
	RESTPostAPIChatInputApplicationCommandsJSONBody,
	Routes,
} from 'discord.js';
import CustomClient from '../classes/custom-client';
import Event from '../classes/event';
import commands from '../commands';

class Ready extends Event<'ready'> {
	async execute(client: CustomClient) {
		const commandsJson: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
		const rest = new REST().setToken(process.env.DISCORD_KEY!);

		commands.forEach((command) => {
			commandsJson.push(command.data.toJSON());
			client.commands.set(command.data.name, command.execute);
			console.debug(`[command] ${command.data.name} loaded`);
		});

		await rest.put(Routes.applicationCommands(process.env.APP_ID!), {
			body: commandsJson,
		});
		console.debug('[command] all commands successfully sent to discord');
		console.debug(
			`[start] - bot started at ${typeof Bun != 'undefined' ? 'Bun' : 'Nodejs'} v${
				process.versions.bun
			}`
		);
		client.user?.setStatus(client.debug ? 'idle' : 'online');
		client.user?.setActivity(client.debug ? 'modo de desenvolvimento' : 'mim de papai', {
			type: ActivityType.Competing,
		});
	}
}

export default new Ready('ready', true);

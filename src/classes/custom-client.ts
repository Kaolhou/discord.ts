import { Client, ClientOptions, Collection } from 'discord.js';
import events from '../events';
import Command from './command';

type Options = ClientOptions & {
	debug: boolean;
};

export default class CustomClient extends Client {
	public debug;
	commands = new Collection<string, Command['execute']>();
	constructor(options: Options) {
		console.log('[event] initializing bot...')
		super(options);
		this.debug = options.debug;
	}

	async loadEvents() {
		events.forEach((event) => {
			event.once
				? this.once(event.eventName, event.execute.bind(null, this))
				: this.on(event.eventName, event.execute.bind(null, this));
			console.debug(`[event] ${event.eventName} loaded`);
		});
	}

	async init(token: string) {
		await this.loadEvents();
		this.login(token);
	}
}

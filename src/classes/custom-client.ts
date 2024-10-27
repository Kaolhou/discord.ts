import { Client, ClientOptions, Collection } from 'discord.js';
import events from '../events';
import Command from './command';

type Options = ClientOptions & {
	debug: boolean;
};

export default class CustomClient extends Client {
	commands = new Collection<string, Command['execute']>();
	public debug;
	constructor(options: Options) {
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

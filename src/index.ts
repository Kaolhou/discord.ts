import CustomClient from './classes/custom-client';
// import { createLogger } from './classes/logger';

const { DISCORD_KEY } = process.env;

const DEBUG = process.argv.findIndex((a) => a == '--debug') != -1;

// const logger = createLogger(DEBUG);
// type LogLevel = 'log' | 'error' | 'warn' | 'debug' | 'info';

// Object.keys(logger)
// 	.filter((i) => !i.startsWith('_'))
// 	.forEach((i) => {
// 		console[i as LogLevel] = (...args: any[]) => {
// 			logger[i as LogLevel](...args);
// 		};
// 	});

new CustomClient({
	intents: [
		'MessageContent',
		'Guilds',
		'GuildMessages',
		'GuildVoiceStates',
		'DirectMessages',
		'GuildPresences',
	],
	debug: DEBUG,
}).init(DISCORD_KEY!);

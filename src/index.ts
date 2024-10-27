import CustomClient from './classes/custom-client';
const { DISCORD_KEY } = process.env;

const DEBUG = process.argv.findIndex((a) => a == '--debug') != -1;

// const originalConsole = console;

// console = (function (oldCons) {
// 	return {
// 		log: function (...text: any[]) {
// 			oldCons.log('\x1b[32m[LOG]\x1b[0m', ...text);
// 		},
// 		info: function (...text: any[]) {
// 			oldCons.info('\x1b[34m[INFO]\x1b[0m', ...text);
// 		},
// 		warn: function (...text: any[]) {
// 			oldCons.warn('\x1b[33m[LOG]\x1b[0m', ...text);
// 		},
// 		error: function (...text: any[]) {
// 			oldCons.error('\x1b[31m[ERROR]\x1b[0m', ...text);
// 		},
// 		debug: function (...text: any[]) {
// 			if (DEBUG) oldCons.error('\x1b[33m[DEBUG]\x1b[0m', ...text);
// 		},
// 	};
// })(originalConsole);

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

enum Colors {
	LOG = '\x1b[37m', // Branco
	ERROR = '\x1b[31m', // Vermelho
	WARN = '\x1b[33m', // Amarelo
	DEBUG = '\x1b[35m', // Roxo
	INFO = '\x1b[34m', // Azul
	RESET = '\x1b[0m', // Resetar cor
}
export function createLogger(debugMode: boolean) {
	const oldConsole = console;

	const _logWithPrefix = (level: string, ...args: any[]) => {
		const color = level || Colors.RESET;
		oldConsole.log(color + `[${level}] - ` + Colors.RESET, ...args);
	};

	return {
		log: (...args: any[]) => _logWithPrefix(Colors.LOG, ...args),
		error: (...args: any[]) => _logWithPrefix(Colors.ERROR, ...args),
		warn: (...args: any[]) => _logWithPrefix(Colors.WARN, ...args),
		debug: (...args: any[]) => {
			if (debugMode) {
				_logWithPrefix(Colors.DEBUG, ...args);
			}
		},
		info: (...args: any[]) => _logWithPrefix(Colors.INFO, ...args),
	};
}

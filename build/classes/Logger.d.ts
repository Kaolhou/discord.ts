export default class Logger {
    enableDebug: boolean;
    constructor(debug: boolean);
    dateTime(): string;
    success(data: any): void;
    info(data: any): void;
    debug(data: any): void;
    error(data: any): void;
    fatal(data: any): void;
    warn(data: any): void;
}

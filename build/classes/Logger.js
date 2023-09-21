// import { pino } from "pino";
export default class Logger {
    constructor(debug) {
        this.enableDebug = debug;
    }
    dateTime() {
        return new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    }
    success(data) {
        console.info("[%s] \x1b[32m%s\x1b[0m - %s", this.dateTime(), "[OK]", data);
    }
    info(data) {
        console.info("[%s] \x1b[36m%s\x1b[0m - %s", this.dateTime(), "[info]", data);
    }
    debug(data) {
        if (this.enableDebug) {
            console.debug("[%s] \x1b[33m%s\x1b[0m - %s", this.dateTime(), "[debug]", data);
        }
    }
    error(data) {
        console.error("[%s] \x1b[31m%s\x1b[0m - %s", this.dateTime(), "[error]", data);
    }
    fatal(data) {
        console.error("[%s] \x1b[31m%s\x1b[0m - %s", this.dateTime(), "[fatal]", data);
    }
    warn(data) {
        console.warn("[%s] \x1b[33m%s\x1b[0m - %s", this.dateTime(), "[warn]", data);
    }
}

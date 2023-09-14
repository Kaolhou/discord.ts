// import { pino } from "pino";

export default class Logger {
  public enableDebug
  constructor(debug:boolean){
    this.enableDebug = debug
  }
  public dateTime() {
    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  }
  success(data: any) {
    console.info(
      "[%s] \x1b[32m%s\x1b[0m - %s",
      this.dateTime(),
      "[OK]",
      data
    );
  }

  info(data: any) {
    console.info(
      "[%s] \x1b[36m%s\x1b[0m - %s",
      this.dateTime(),
      "[info]",
      data
    );
  }
  debug(data: any) {
    if(this.enableDebug){
      console.debug(
        "[%s] \x1b[33m%s\x1b[0m - %s",
        this.dateTime(),
        "[debug]",
        data
      );
    }
  }
  error(data: any) {
    console.error(
      "[%s] \x1b[31m%s\x1b[0m - %s",
      this.dateTime(),
      "[error]",
      data
    );
  }
  fatal(data: any) {
    console.error(
      "[%s] \x1b[31m%s\x1b[0m - %s",
      this.dateTime(),
      "[fatal]",
      data
    );
  }
  warn(data: any) {
    console.warn(
      "[%s] \x1b[33m%s\x1b[0m - %s",
      this.dateTime(),
      "[warn]",
      data
    );
  }
}

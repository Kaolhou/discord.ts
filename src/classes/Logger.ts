import { pino } from "pino";

export default class Logger {
  private logger = pino({
    transport: {
      target: "pino-pretty",
    },
  });

  info(data: any) {
    this.logger.info(data);
  }
  debug(data: any) {
    this.logger.debug(data);
  }
  error(data: any) {
    this.logger.error(data);
  }
  fatal(data: any) {
    this.logger.fatal(data);
  }
  warn(data: any) {
    this.logger.warn(data);
  }
}

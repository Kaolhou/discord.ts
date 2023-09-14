import Main from "../classes/Main";
import Event from "../classes/base/Event";

class Debug extends Event<"debug"> {
  public async exe(client: Main, message: string): Promise<void> {
    // client.logger.info(client.debug);
    if (client.debug) client.logger.debug(message);
  }
}

export default new Debug("debug");

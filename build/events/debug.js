import Event from "../classes/base/Event";
class Debug extends Event {
    async exe(client, message) {
        // client.logger.info(client.debug);
        if (client.debug)
            client.logger.debug(message);
    }
}
export default new Debug("debug");

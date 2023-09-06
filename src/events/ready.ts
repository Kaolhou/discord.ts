import { REST, Routes } from "discord.js";
import Main from "../classes/Main.ts";
import Event from "../classes/base/Event.ts";
import { commands } from "../commands/index.ts";

class Ready extends Event<"ready"> {
  public async exe(client: Main): Promise<void> {
    const rest = new REST({ version: "9" }).setToken(client.token!);

    const jsonCommands = [];

    for (const command of commands) {
      client.commands.set(command.data.name, command);
      jsonCommands.push(command.data.toJSON());
      client.logger.info(`[commands] - ${command.data.name} loaded`);
    }

    rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {
      body: jsonCommands,
    });

    client.logger.info("[ready] - bot started");
  }
}
export default new Ready("ready", true);

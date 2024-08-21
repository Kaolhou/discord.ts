import {
  REST,
  Routes,
  type RESTPostAPIChatInputApplicationCommandsJSONBody as JsonBody,
} from "discord.js";
import Bot from "../structures/Bot.js";
import { Event } from "../structures/Event.js";
import commands from "../commands/index.js";

class Ready extends Event<"ready"> {
  public async execute(client: Bot) {
    const rest = new REST().setToken(process.env.DISCORD_KEY!);
    let commandsJson: JsonBody[] = [];
    try {
      commands.forEach((command) => {
        client.commands.set(command.data.name, command);
        commandsJson.push(command.data.toJSON());
        console.debug(`[command] ${command.data.name} loaded`);
      });

      await rest.put(Routes.applicationCommands(process.env.APP_ID!), {
        body: commandsJson,
      });
      console.debug(`[command] all commands loaded`);
    } catch (error) {
      console.error(
        `[error] something went wrong while pushing slash commands`,
        "\n",
        error
      );
    }

    console.debug("Discord bot started");
    console.debug(`Node.js ${process.version}`);
  }
}

export const ready = new Ready("ready", true);

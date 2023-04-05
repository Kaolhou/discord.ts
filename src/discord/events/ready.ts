import { REST, Routes } from "discord.js";
import commands from "../commands/index.js";
import Command from "../classes/bases/Command.js";
import Event from "../classes/bases/Event.js";
import { Main } from "../classes/Main.js";
import fs from "fs";
import { resolve } from "path";
// import { Main } from "../structures/Main";

class Ready extends Event<"ready"> {
  public once = true;
  executar(client: Main): void {
    const commandArr: Array<Command> = [];
    const imports: Array<any> = [];
    const rest = new REST({ version: "9" }).setToken(process!.env!.TOKEN!);
    commands.forEach((command) => {
      client.commands.set(command.data.name, command);
      if (
        fs
          .readFileSync(resolve(process.cwd(), ".commandignore"))
          .toString()
          .split("\n")
          .includes(command.data.name)
      ) {
        client.logger.info(
          "\x1b[33m%s\x1b[0m",
          `[commands] ${command.data.name} ignored`
        );
      } else {
        client.logger.info(
          "\x1b[33m%s\x1b[0m",
          `[commands] ${command.data.name} loaded`
        );
      }
      imports.push(command);
    });
    imports.map((i) => {
      commandArr.push(i.data.toJSON());
    });

    rest
      .put(
        Routes.applicationCommands(
          process!.env!.CLIENT_ID! /*, process!.env!.GUILD_ID!*/
        ),
        { body: commandArr }
      )
      .then(() => {
        client.logger.info(
          `\x1b[32m%s\x1b[0m`,
          `[commands] all commands loaded and submitted to discord`
        );
      })
      .catch((err) => {
        throw new Error(err);
      });
    client.logger.info(`\x1b[32m%s\x1b[0m`, `[ready] bot started`);
    process.stdout.write("\u0007");
  }
}
export default new Ready("ready");

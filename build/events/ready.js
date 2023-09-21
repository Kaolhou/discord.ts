import { REST, Routes } from "discord.js";
import Event from "../classes/base/Event";
import { commands } from "../commands/index";
class Ready extends Event {
    async exe(client) {
        const rest = new REST({ version: "9" }).setToken(client.token);
        const jsonCommands = [];
        for (const command of commands) {
            client.commands.set(command.data.name, command);
            jsonCommands.push(command.data.toJSON());
            client.logger.info(`[commands] - ${command.data.name} loaded`);
        }
        rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {
            body: jsonCommands,
        });
        await client.prisma.guild
            .createMany({
            data: client.guilds.cache.map((val) => {
                return {
                    guildId: val.id,
                };
            }),
            skipDuplicates: true,
        })
            .then((rows) => client.logger.info(`created ${rows.count} without guildCreate event`));
        client.logger.success("[ready] - bot started");
    }
}
export default new Ready("ready", true);

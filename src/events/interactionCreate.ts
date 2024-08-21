import type { Interaction, CacheType, GuildMember } from "discord.js";
import type Bot from "../structures/Bot";
import { Event } from "../structures/Event";
import { havePermissions } from "../util/checkPerms";

class InteractionCreate extends Event<"interactionCreate"> {
  public async execute(client: Bot, interaction: Interaction<CacheType>) {
    switch (true) {
      case interaction.isChatInputCommand():
        const command = client.commands.get(interaction.commandName);
        if (!command) {
          client.emit("error", new Error("Command not found"));
          return;
        }

        if (command.perms.length) {
          if (
            !havePermissions(interaction.member as GuildMember, command.perms)
          ) {
            await interaction.reply(
              client.locales.get(
                "default_errors.missing_permissions",
                interaction.locale
              )
            );
            return;
          }
        }
        await interaction.deferReply();

        command?.execute(client, interaction);

        break;
      case interaction.isButton():
        break;
      default:
        break;
    }
  }
}

export default new InteractionCreate("interactionCreate");

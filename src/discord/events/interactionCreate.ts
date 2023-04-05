import { Interaction, CacheType } from "discord.js";
import Event from "../classes/bases/Event.js";
import { Main } from "../classes/Main.js";

class InteractionCreate extends Event<"interactionCreate"> {
  public async executar(
    client: Main,
    interaction: Interaction<CacheType>
  ): Promise<any> {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);
      if (
        interaction.inGuild()
          ? !interaction.memberPermissions?.has("UseApplicationCommands")
          : false
      ) {
        await interaction.reply({
          ephemeral: true,
          content: "você não tem permissão para usar comandos",
        });
        return;
      }
      if (command?.perms) {
        if (
          !command.perms
            .map((i) => interaction.memberPermissions?.has(i))
            .every((i) => i === true)
        ) {
          await interaction.reply({
            ephemeral: true,
            content: "você não tem permissão para usar comandos",
          });
          return;
        }
      }
      if (!interaction.inGuild() && !command?.acceptDM) {
        await interaction.reply({
          ephemeral: true,
          content: "esse comando não pode ser usado em uma DM",
        });
        return;
      }

      await interaction.deferReply();
      command?.executar(client, interaction);
    }
  }
}

export default new InteractionCreate("interactionCreate");

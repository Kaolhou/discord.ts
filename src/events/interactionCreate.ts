import {
  Interaction,
  CacheType,
  GuildMember,
  PermissionResolvable,
  GuildMemberRoleManager,
} from "discord.js";
import Main from "../classes/Main";
import Event from "../classes/base/Event";

class InteractionCreate extends Event<"interactionCreate"> {
  public async exe(
    client: Main,
    interaction: Interaction<CacheType>
  ): Promise<void> {
    if (interaction.isChatInputCommand()) {
      await interaction.deferReply();
      const command = client.commands.get(interaction.commandName);
      const member = await interaction.guild?.members.fetch(interaction.user.id);
      if(!member) return;
      if (!command) {
        await interaction.editReply("something went wrong");
        return;
      }
      console.debug(member.permissions.has('Administrator'))
      if (command.perms && command.perms.length > 0) {
        for (const perm in command.perms) {
          if (
            !(interaction.member as GuildMember).permissions.has(
              perm as PermissionResolvable
            )
          ) {
            await interaction.editReply(`você não tem permissão de: ${perm}`);
            return;
          }
        }
      }

      await command.execute(client, interaction);
    }
  }
}

export default new InteractionCreate("interactionCreate");

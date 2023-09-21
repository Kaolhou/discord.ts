import Event from "../classes/base/Event";
class InteractionCreate extends Event {
    async exe(client, interaction) {
        if (interaction.isChatInputCommand()) {
            await interaction.deferReply();
            const command = client.commands.get(interaction.commandName);
            const member = await interaction.guild?.members.fetch(interaction.user.id);
            if (!member)
                return;
            if (!command) {
                await interaction.editReply("something went wrong");
                return;
            }
            if (command.perms && command.perms.length > 0) {
                for (const perm in command.perms) {
                    if (!interaction.member.permissions.has(perm)) {
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

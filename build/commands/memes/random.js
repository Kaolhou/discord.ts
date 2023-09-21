import { SlashCommandSubcommandBuilder, } from "discord.js";
import Command from "../../classes/base/Command";
import path from "path";
class Random extends Command {
    async execute(client, interaction) {
        const random_meme = path.resolve(process.env.MEMES_PATH, (await client.prisma.meme.findMany()).sort(() => 0.5 - Math.random())[0]
            .nome);
        client.logger.debug(random_meme);
        await interaction.editReply({
            files: [random_meme],
        });
    }
}
export default new Random(new SlashCommandSubcommandBuilder()
    .setName("random")
    .setDescription("envia um meme aleatório"), ["UseApplicationCommands", "AttachFiles"]);

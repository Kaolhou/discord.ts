import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import Main from "../classes/Main";
import Command from "../classes/base/Command";

class Attack extends Command {
  public externalGifs: string[] = [
    "https://media.tenor.com/5Ux_3QfUicgAAAAC/cat-gun.gif",
    "https://media1.giphy.com/media/aGPrYkjsWOzSg/giphy.gif",
    "https://media.tenor.com/tL1G7xBMODkAAAAM/penguin-attack.gif",
    "https://media.tenor.com/Fa9WED6NcmAAAAAC/deer-attack.gif",
    "https://media.tenor.com/rwOWLr2boj8AAAAM/lion-attack-wild-animals.gif",
    "https://i.gifer.com/9l8o.gif",
    "https://i.pinimg.com/originals/58/f4/21/58f4217f3e8ca4221711091af573fe53.gif",
    "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a2a4e457-930d-44d2-b27c-686b9812225f/d57z2ed-df3c1909-77c0-4247-9f46-68ad5317412d.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2EyYTRlNDU3LTkzMGQtNDRkMi1iMjdjLTY4NmI5ODEyMjI1ZlwvZDU3ejJlZC1kZjNjMTkwOS03N2MwLTQyNDctOWY0Ni02OGFkNTMxNzQxMmQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.2xBOb4smYMP8Lt_Dm6javBZzLL-vXVWU9hf0C961yuc",
    "https://i.gifer.com/9Bmk.gif",
    "https://gifbin.com/bin/062010/1276776592_deer-attacks-dog.gif",
    "https://media1.giphy.com/media/hclt1cGUlpRO8/200w.gif?cid=82a1493bfhc1gje97ngudj23hm8p7z61j6xer8febqlqlc0p&ep=v1_gifs_related&rid=200w.gif&ct=g",
  ];

  async execute(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const target = interaction.options.getUser("person");
    const embed = new EmbedBuilder()
      .setDescription(
        `${interaction.user.toString()} atacou ${target?.toString()}`
      )
      .setImage(this.externalGifs.sort(() => 0.5 - Math.random())[0])
      .setColor("Red");

    await interaction.editReply({
      embeds: [embed],
    });
  }
}

export default new Attack(
  new SlashCommandBuilder()
    .setName("attack")
    .setDescription("attack someone")
    .addUserOption((input) =>
      input
        .setName("person")
        .setDescription("target of the attack")
        .setRequired(true)
    )
);

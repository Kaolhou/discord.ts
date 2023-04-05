import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
} from "discord.js";
import Command from "../classes/bases/Command";
import { Main } from "../classes/Main";
import Ifunny, { meme } from "../classes/Ifunny";
import axios from "axios";

class Meme extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    const { keyv } = client;
    const source = interaction.options.getSubcommand(true) as
      | "ifunny"
      | "local"
      | "reddit";
    if (source == "ifunny") {
      let page: number;
      let ifunny: Ifunny;
      const amontMemes = (await keyv.get("amontMemes")) as meme[] | undefined;

      if (await keyv.get("ifunny_token"))
        ifunny = new Ifunny({ axios, token: await keyv.get("ifunny_token") });
      else {
        ifunny = new Ifunny({ axios });
        await ifunny.getToken();
        //todo adicionar set do getToken
      }

      if (await keyv.get("page")) {
        page = await keyv.get("page");
      } else {
        await keyv.set("page", 1);
        page = 1;
      }

      let meme: meme;
      if (!amontMemes || amontMemes.length == 0) {
        const data = (await ifunny.getMemes(page)).items.sort(
          () => Math.random() * -0.5
        );
        meme = data.shift()!;
        await keyv.set("amontMemes", data);
      } else {
        meme = amontMemes.shift()!;
        await keyv.set("amontMemes", amontMemes);
      }
      interaction.editReply(meme.url);
    } else if (source == "local") {
      interaction.editReply("workin on that");
    } else if (source == "reddit") {
      interaction.editReply("workin on that");
    }
  }
}

export default new Meme(
  new SlashCommandBuilder()
    .setName("meme")
    .setDescription("Show a meme")
    .setDescriptionLocalization("pt-BR", "Mostra um meme")
    .addSubcommand((option) =>
      option
        .setName("ifunny")
        .setDescription("the platform source")
        .setDescriptionLocalization("pt-BR", "a plataforma fonte")
    )
    .addSubcommand((option) =>
      option
        .setName("local")
        .setDescription("the platform source")
        .setDescriptionLocalization("pt-BR", "a plataforma fonte")
    )
    .addSubcommand((option) =>
      option
        .setName("reddit")
        .setDescription("the platform source")
        .setDescriptionLocalization("pt-BR", "a plataforma fonte")
    )
);

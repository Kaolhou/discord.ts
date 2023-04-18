import {
  ChatInputCommandInteraction,
  CacheType,
  SlashCommandBuilder,
  EmbedBuilder,
} from "discord.js";
import Command from "../classes/bases/Command.js";
import { Main } from "../classes/Main.js";
import prisma from "../../util/prisma.js";
import axios from "axios";
import path from "path";
import fs from "fs";

class Waifu extends Command {
  public async executar(
    client: Main,
    interaction: ChatInputCommandInteraction<CacheType>
  ): Promise<void> {
    //seleciona um número inteiro aleatório entre 1 e 99999
    // const random_number = Math.floor(Math.random() * 99998) + 1;
    let reset = false;
    const random_number = 222;
    let user = await prisma.user.findUnique({
      where: {
        id: interaction.user.id,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          id: interaction.user.id,
          isSubscriber: false,
          waifusThisWeek: 0,
          lastWaifu: new Date(),
          waifusGenerated: 0,
        },
      });
    }
    if (!user.isSubscriber) {
      if (user.lastWaifu.getDay() < 1 || user.waifusThisWeek >= 5) {
        await interaction.editReply("vc nn pode gerar mais waifus");
        return;
      } else {
        reset = true;
      }
    }

    if (
      (await prisma.waifu.count({
        where: {
          id: random_number,
        },
      })) == 0
    ) {
      const [image, text] = await Promise.all([
        axios.get<string>(
          `https://www.thiswaifudoesnotexist.net/example-${random_number}.jpg`,
          {
            responseType: "arraybuffer",
          }
        ),
        axios.get(
          `https://www.thiswaifudoesnotexist.net/snippet-${random_number}.txt`
        ),
      ]);
      fs.writeFile(
        path.resolve(
          process.cwd(),
          "media",
          "public",
          "waifus",
          `${random_number}.jpg`
        ),
        image.data,
        (err) => {
          err && client.logger.error(err);
        }
      );
      fs.writeFile(
        path.resolve(
          process.cwd(),
          "media",
          "public",
          "waifus",
          `${random_number}.txt`
        ),
        text.data,
        (err) => {
          err && client.logger.error(err);
        }
      );
      await prisma.waifu.create({
        data: {
          id: random_number,
          imgUrl: `https://www.thiswaifudoesnotexist.net/example-${random_number}.jpg`,
          textUrl: `https://www.thiswaifudoesnotexist.net/snippet-${random_number}.txt`,
          users: {
            connect: {
              userId: interaction.user.id,
            },
          },
        },
      });
    } else {
      await prisma.user.update({
        where: {
          id: interaction.user.id,
        },
        data: {
          lastWaifu: new Date(),
          waifusThisWeek: reset
            ? 0
            : {
                increment: 1,
              },
          waifusGenerated: {
            increment: 1,
          },
        },
      });
      const txt = fs
        .readFileSync(
          path.resolve(
            process.cwd(),
            "media",
            "public",
            "waifus",
            `${random_number}.txt`
          )
        )
        .toString("utf8");
      const image = fs.readFileSync(
        path.resolve(
          process.cwd(),
          "media",
          "public",
          "waifus",
          `${random_number}.jpg`
        )
      );

      await interaction.editReply({
        embeds: [new EmbedBuilder().setDescription(txt)],
        files: [
          {
            attachment: image,
            name: `${random_number}.jpg`,
          },
        ],
      });
    }
  }
}

export default new Waifu(
  new SlashCommandBuilder()
    .setName("waifu")
    .setDescription("Send a Waifu pic")
    .setDescriptionLocalization("pt-BR", "Envia uma foto de uma waifu")
);

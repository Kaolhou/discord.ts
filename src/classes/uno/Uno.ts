import type { color, unoSymbol } from "./types";
import { Client, CommandInteraction, Message, User } from "discord.js";
import Main from "../Main";
import Card from "./Card";

interface Player extends User {
  deck: Card[];
  message?: Message<false>;
  hasBought: boolean;
}
class Uno {
  public readonly guildId;
  public turn;
  public way: 1 | -1;
  public players: Player[];

  public current: Card;
  private amountToBuy: number;
  private channel: string;

  public readonly monte: Card[] = [];

  constructor(client: Main, interaction: CommandInteraction, players: User[]) {
    this.amountToBuy = 0;
    this.guildId = client;
    this.players = players.map((i) =>
      Object.assign(i, { deck: [], message: undefined, hasBought: false })
    );
    //todo: shuffle players
    this.turn = 0;
    this.way = 1;
    this.setMonte();
    this.channel = interaction.channelId;
    this.current = this.getFirst();
  }

  public async awaitToPlay() {
    return new Promise((res, rej) => {
      setTimeout(() => rej(""), 1000 * 60 * 2);
    });
  }

  can(target: Card, played: Card) {
    if (played.color === "black") {
      return true;
    }

    if (
      target.buy &&
      this.amountToBuy &&
      (played.number || played.blocks || played.reverse)
    ) {
      return false;
    }

    //acumular compras
    if (target.buy && played.buy) {
      return true;
    }

    if (target.color === played.color || target.symbol === played.symbol) {
      return true;
    }

    if (this.amountToBuy && played.buy) {
      return true;
    }

    return false;
  }

  getFirst() {
    while (true) {
      let card = this.monte.sort(() => Math.random() - 0.5)[0];
      if (card.number != -1) {
        this.monte.shift();
        return card;
      }
    }
  }

  getRandom() {
    let card = this.monte.shift();
    if (!card) {
      this.setMonte();
      card = this.monte.shift()!;
    }
    return card;
  }

  setMonte() {
    const colors: color[] = ["blue", "green", "red", "yellow"];
    (
      [
        "0",
        "1",
        "1",
        "2",
        "2",
        "3",
        "3",
        "4",
        "4",
        "5",
        "5",
        "6",
        "6",
        "7",
        "7",
        "8",
        "9",
        "9",
        "plus",
        "plus",
        "reve",
        "reve",
        "block",
        "block",
      ] as unoSymbol[]
    ).forEach((i) => {
      colors.forEach((j) => {
        this.monte.push(new Card(j, i, i == "plus" ? 2 : 0));
      });
    });

    for (let i = 0; i < 8; i++) {
      this.monte.push(new Card("black", i >= 4 ? "color" : "color4"));
    }

    console.debug(this.monte);
  }

  reverse() {
    this.turn = this.players.length - this.turn;
    this.players.reverse();
  }

  skip(times: number = 1) {}

  render() {}

  resolvePendencies() {}

  play() {}
}

export default Uno;

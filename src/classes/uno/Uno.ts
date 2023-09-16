import type { color, unoSymbol } from "./types";
import { CommandInteraction, User } from "discord.js";
import Main from "../Main";

class Card {
  public readonly color: color;
  public readonly special: boolean;
  public readonly symbol: unoSymbol;
  public readonly number: number;
  public readonly reverse: boolean;
  public readonly blocks: boolean;
  public readonly buy: number;
  public readonly changeColor: boolean;

  constructor(color: color, symbol: unoSymbol, plus: 0 | 2 | 4 = 0) {
    this.special =
      symbol == "reve" ||
      symbol == "color" ||
      symbol == "plus" ||
      symbol == "block" ||
      symbol == "color4";
    this.number = this.special ? -1 : Number(symbol);
    this.reverse = symbol == "reve";
    this.blocks = symbol == "block";
    this.changeColor = symbol == "color" || symbol == "color4";
    this.buy = plus;
    this.symbol = symbol;
    this.color = color;
  }

  toString(): string {
    if (this.color == "black" || this.symbol == "00") return this.symbol;
    if (this.symbol == "plus")
      return this.symbol + this.buy + this.color.charAt(0);

    return this.symbol + this.color.charAt(0);
  }
}

class Uno {
  public readonly guildId;
  public turn;
  public way: 1 | -1;
  public players: User[];

  public readonly monte: Card[] = [];

  constructor(client: Main, interaction: CommandInteraction, players: User[]) {
    this.guildId = client;
    this.players = players;
    //todo: shuffle players
    this.turn = 0;
    this.way = 1;
    this.setMonte();
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
    this.way *= -1;
  }

  skip(times: number = 1) {}

  render() {}

  resolvePendencies() {}

  play() {}
}

export default Uno;

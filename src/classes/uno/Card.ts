import { color, unoSymbol } from "./types";

export default class Card {
  readonly color: color;
  readonly special: boolean;
  readonly symbol: unoSymbol;
  readonly number: number;
  readonly reverse: boolean;
  readonly blocks: boolean;
  readonly buy: number;
  readonly changeColor: boolean;

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
    if (this.color == "black") return this.symbol;
    if (this.symbol == "plus")
      return this.symbol + this.buy + this.color.charAt(0);

    return this.symbol + this.color.charAt(0);
  }
}

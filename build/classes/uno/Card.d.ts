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
    constructor(color: color, symbol: unoSymbol, plus?: 0 | 2 | 4);
    toString(): string;
}

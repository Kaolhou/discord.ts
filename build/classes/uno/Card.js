export default class Card {
    constructor(color, symbol, plus = 0) {
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
    toString() {
        if (this.color == "black")
            return this.symbol;
        if (this.symbol == "plus")
            return this.symbol + this.buy + this.color.charAt(0);
        return this.symbol + this.color.charAt(0);
    }
}

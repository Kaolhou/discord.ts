import { CommandInteraction, Message, User } from "discord.js";
import Main from "../Main";
import Card from "./Card";
interface Player extends User {
    deck: Card[];
    message?: Message<false>;
    hasBought: boolean;
}
declare class Uno {
    readonly guildId: Main;
    turn: number;
    way: 1 | -1;
    players: Player[];
    current: Card;
    private amountToBuy;
    private channel;
    readonly monte: Card[];
    constructor(client: Main, interaction: CommandInteraction, players: User[]);
    awaitToPlay(): Promise<unknown>;
    can(target: Card, played: Card): boolean;
    getFirst(): Card;
    getRandom(): Card;
    setMonte(): void;
    reverse(): void;
    skip(times?: number): void;
    render(): void;
    resolvePendencies(): void;
    play(): void;
}
export default Uno;

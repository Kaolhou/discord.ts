import { Client, ClientOptions } from "discord.js";
interface MainMethods {
    initialize: (token: string) => void;
    loadEvents: () => void;
}
interface Options extends ClientOptions {
}
export default class Main extends Client implements MainMethods {
    constructor(options: Options);
    loadEvents(): void;
    initialize(token: string): void;
}
export {};

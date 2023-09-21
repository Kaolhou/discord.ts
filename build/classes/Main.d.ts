import { Client, ClientOptions, Collection } from "discord.js";
import Uno from "./uno/Uno";
import Logger from "./Logger";
import { PrismaClient } from "@prisma/client";
import Command from "./base/Command";
interface MainI {
    logger: Logger;
    prisma: PrismaClient;
    debug: boolean;
    initialize: (token: string) => void;
    loadEvents: () => void;
}
interface Options extends ClientOptions {
    logger: Logger;
    prisma: PrismaClient;
    memesPath: string;
    debug: boolean;
}
export default class Main extends Client implements MainI {
    private memesPath;
    commands: Collection<string, Command>;
    guildsUno: Collection<string, Uno>;
    debug: boolean;
    logger: Logger;
    prisma: PrismaClient;
    constructor(options: Options);
    private loadMemes;
    loadEvents(): void;
    initialize(token: string): this;
}
export {};

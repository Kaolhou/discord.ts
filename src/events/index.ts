import { ready } from "./ready";
import type { Event } from "../structures/Event";
import interactionCreate from "./interactionCreate";
import messageCreate from "./messageCreate";

export default [ready, interactionCreate, messageCreate] as Event<any>[];

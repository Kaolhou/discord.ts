import Event from "../classes/base/Event.ts";
import debug from "./debug.ts";
import interactionCreate from "./interactionCreate.ts";
import messageDelete from "./messageDelete.ts";
import ready from "./ready.ts";

export default [interactionCreate, debug, messageDelete, ready] as Event<any>[];

import Event from "../classes/base/Event.ts";
import debug from "./debug.ts";
import interactionCreate from "./interactionCreate.ts";
import messageCreate from "./messageCreate.ts";
import messageDelete from "./messageDelete.ts";
import ready from "./ready.ts";

export default [interactionCreate, debug, messageDelete, ready,messageCreate,messageDelete] as Event<any>[];

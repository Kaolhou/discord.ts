import Event from "../classes/base/Event.ts";
import debug from "./debug.ts";
import interactionCreate from "./interactionCreate.ts";
import ready from "./ready.ts";

export default [ready, interactionCreate, debug] as Event<any>[];

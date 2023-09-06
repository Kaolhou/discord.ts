import Event from "../classes/base/Event.ts";
import interactionCreate from "./interactionCreate.ts";
import ready from "./ready.ts";

export default [ready, interactionCreate] as Event<any>[];

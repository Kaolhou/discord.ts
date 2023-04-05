import interactionCreate from "./interactionCreate.js";
import ready from "./ready.js";
import Event from "../classes/bases/Event.js";

export default [ready, interactionCreate] as Event<any>[];

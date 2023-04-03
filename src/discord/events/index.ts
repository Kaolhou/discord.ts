import interactionCreate from "./interactionCreate";
import ready from "./ready";
import Event from "../classes/bases/Event";

export default [ready, interactionCreate] as Event<any>[];

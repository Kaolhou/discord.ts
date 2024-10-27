import Event from '../classes/event';
import interactionCreate from './interaction-create';
import ready from './ready';

export default [ready, interactionCreate] as Event<any>[];

import Event from '../classes/event';
import error from './error';
import interactionCreate from './interaction-create';
import ready from './ready';

export default [ready, interactionCreate, error] as Event<any>[];

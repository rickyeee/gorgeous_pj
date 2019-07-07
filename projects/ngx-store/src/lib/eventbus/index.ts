import { EventEmitter } from 'events';

export class StateEvent extends EventEmitter {}
export const stateEvent = new StateEvent();

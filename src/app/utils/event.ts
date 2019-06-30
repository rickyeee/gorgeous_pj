import { EventEmitter } from 'events';

/**
 * 用内置EventEmitter
 */
export class StateEvent extends EventEmitter {}
export const stateEvent = new StateEvent();

import { SyncActions } from '../types';
import { binding } from './binding';

export function generateSyncActions(
    prototype, propertyKey: string, defaultData: any
): SyncActions<any> {
    const namespace = prototype.namespace ? prototype.namespace() : '';
    const stateKey = `${namespace}/${propertyKey}`;
    // default state
    prototype.setState(stateKey, defaultData || null);
    return {
        sync: (payload) => prototype.setState(stateKey, payload),
        get: () => prototype.getState(stateKey),
        bind: binding(prototype, stateKey, propertyKey)
    };
}

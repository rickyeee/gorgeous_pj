import { SyncActions } from '../types';
import { binding } from './binding';

export function generateSyncActions(
    prototype, propertyKey: string, defaultData: any
): SyncActions<any> {
    const namespace = prototype.namespace ? prototype.namespace() : '';
    const stateKey = `${namespace}/${propertyKey}`;
    // 设置一个默认值
    prototype.setState(stateKey, defaultData);
    return {
        sync: (payload) => prototype.setState(stateKey, payload),
            get: () => prototype.getState(stateKey),
            bind: binding(stateKey, propertyKey, prototype)
    };
}

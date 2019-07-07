import { stateEvent } from '../eventbus';
import { SyncActions } from '../types';

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
            bind: (context) => {
                // todo：防止多次bind，同一个context对同一个属性只能监听一次
                stateEvent.on(stateKey, (payload) => {
                    context[propertyKey] = payload;
                });
                return context[propertyKey] = prototype.getState(stateKey);
            }
    };
}
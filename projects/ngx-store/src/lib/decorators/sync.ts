import { generateSyncActions } from '../actions';

/**
 * 同步action只能触发同步行为
 */
export interface SyncActions<T> {
    sync(payload: T): void;
    get(): T;
    // 双向绑定state，跨组件同步已更新的state
    bind(context): T;
}

/**
 * sync mode
 * @param defaultData? 默认值 or 初始值
 */
export function Sync(defaultData = null): any {
    return (target, propertyKey) => {
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            writable: false,
            value: generateSyncActions(target, propertyKey, defaultData)
        });
    };
}




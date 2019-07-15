import { generateSyncActions } from '../actions';

/**
 * sync mode
 * @param defaultData?
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




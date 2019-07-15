import { Observable } from 'rxjs';
import { generateAsyncActions } from '../actions';

/**
 * async mode
 * @Async(sideffect, defaultData?)<any>
 * @param sideEffect like reducer
 * @param data? default data
 */
export function Async(sideEffect: Observable<any>, data = null ): any {
    return (target, propertyKey) => {
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            writable: false,
            value: generateAsyncActions(target, propertyKey, sideEffect, data)
        });
    };
}


import { Observable } from 'rxjs';
import { AsyncActions } from '../types';
import { binding } from './binding';

/**
 * ASYNC ACTION
 * @param prototype prototype of decorated state instance by @Async
 * @param propertyKey component property
 * @param $sideEffect async reducer
 * @param defaultData default
 */
export function generateAsyncActions(
    prototype, propertyKey: string, $sideEffect: Observable<any>, defaultData: any
): AsyncActions<any> {
    const namespace = prototype.namespace ? prototype.namespace() : '';
    const stateKey = `${namespace}/${propertyKey}`;
    // default state
    prototype.setState(stateKey, defaultData || null);
    return {
        // sync: (payload) => prototype.setState(stateKey, payload),
        async: () => new Observable(ob => {
            if ($sideEffect && $sideEffect instanceof Observable) {
                $sideEffect.subscribe(result => {
                    prototype.setState(stateKey, result);
                    ob.next(result);
                }, err => {
                    // todo: log
                    ob.error(err);
                });
            } else {
                console.warn('sideEffect must be an Observable');
            }
        }),
        get: () => prototype.getState(stateKey),
        bind: binding(prototype, stateKey, propertyKey)
    };
}

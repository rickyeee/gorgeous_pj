import { Observable } from 'rxjs';
import { AsyncActions } from '../types';
import { binding } from './binding';

export function generateAsyncActions(
    prototype, propertyKey: string, $sideEffect: Observable<any>, defaultData: any
): AsyncActions<any> {
    const namespace = prototype.namespace ? prototype.namespace() : '';
    const stateKey = `${namespace}/${propertyKey}`;
    // 设置一个默认值
    prototype.setState(stateKey, defaultData);
    return {
        sync: (payload) => prototype.setState(stateKey, payload),
        async: () => new Observable(ob => {
            // 注册时返回Ob才可以调用
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
        bind: binding(stateKey, propertyKey, prototype)
    };
}

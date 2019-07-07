import { Observable } from 'rxjs';
import { generateAsyncActions } from '../actions';

/**
 * async mode
 * @Async 接受一个默认值以及一个副作用的Observable，promise暂不支持
 * 只传入Observable则默认值为null
 * @param sideEffect 异步Ob
 * @param data? 默认值 or 初始值
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


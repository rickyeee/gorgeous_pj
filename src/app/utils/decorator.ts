import { stateEvent } from './event';
import { Observable } from 'rxjs';

/**
 * 定义行为 T: 存储和获取的数据结构
 * 异步action也可触发同步行为
 */
export interface AsyncActions<T> {
    sync(payload: T): void;
    async(): Observable<T>;
    get(): T;
    // 双向绑定state，跨组件同步已更新的state
    bind(context): T;
}
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
 * async mode
 * @Async 接受一个默认值以及一个副作用的Observable，promise暂不支持
 * 只传入Observable则默认值为null
 * @param data? 默认值 or 初始值
 * @param sideEffect? 异步Ob
 */
export function Async(data = null, sideEffect?: Observable<any>): any {
    let defaultData = null;
    let $sideEffect = null;
    if (data instanceof Observable) {
        $sideEffect = data;
    } else {
        defaultData = data;
        $sideEffect = sideEffect;
    }
    return (target, propertyKey) => {
        // async 返回一个Observable
        const namespace = target.namespace ? target.namespace() : '';
        const stateKey = `${namespace}/${propertyKey}`;
        // 设置一个默认值
        target.setState(stateKey, defaultData);

        const actions: AsyncActions<any> = {
            sync: (payload) => target.setState(stateKey, payload),
            async: () => new Observable(ob => {
                // 注册时返回Ob才可以调用
                if ($sideEffect instanceof Observable) {
                    $sideEffect.subscribe(result => {
                        target.setState(stateKey, result);
                        ob.next(result);
                    }, err => {
                        // todo: log
                        ob.error(err);
                    });
                } else {
                    console.warn('sideEffect is required for async mode');
                }
            }),
            get: () => target.getState(stateKey),
            bind: (context) => {
                // todo：防止多次bind，同一个context对同一个属性只能监听一次
                stateEvent.on(stateKey, (payload) => {
                    context[propertyKey] = payload;
                });
                return context[propertyKey] = target.getState(stateKey);
            }
        };
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            writable: false,
            value: actions
        });
    };
}
// 废弃方法装饰器，属性装饰器实现更合适
// export function Async(defaultData: any = null) {
//     return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
//         // async 返回一个Observable
//         const $obForPropertyKey = descriptor.value.call(target);
//         const stateKey = `${target.namespace()}/${propertyKey}`;
//         // 设置一个默认值
//         target.setState(stateKey, defaultData);

//         const actions: Actions<any> = {
//             sync: (data) => target.setState(stateKey, data),
//             async: () => new Observable(ob => {
//                 // 注册时返回Ob才可以调用
//                 if ($obForPropertyKey instanceof Observable) {
//                     $obForPropertyKey.subscribe(result => {
//                         target.setState(stateKey, result);
//                         ob.next(result);
//                     }, err => {
//                         // todo: log
//                         ob.error(err);
//                     });
//                 }
//             }),
//             get: () => target.getState(stateKey)
//         };
//         descriptor.value = actions;
//     };
// }
/**
 * sync mode
 * @param defaultData? 默认值 or 初始值
 */
export function Sync(defaultData = null): any {
    return (target, propertyKey) => {
        const namespace = target.namespace ? target.namespace() : '';
        const stateKey = `${namespace}/${propertyKey}`;
        // set default
        target.setState(stateKey, defaultData);

        const actions: SyncActions<any> = {
            sync: (payload) => target.setState(stateKey, payload),
            get: () => target.getState(stateKey),
            bind: (context) => {
                // todo：防止多次bind，同一个context对同一个属性只能监听一次
                stateEvent.on(stateKey, (payload) => {
                    context[propertyKey] = payload;
                });
                return context[propertyKey] = target.getState(stateKey);
            }
        };
        Object.defineProperty(target, propertyKey, {
            configurable: true,
            enumerable: true,
            writable: false,
            value: actions
        });
    };
}
// 废弃方法装饰器，属性装饰器实现更合适
// export function Sync(defaultData: any = null) {
//     return (target: any, propertyKey: string, descriptor: PropertyDescriptor): void => {
//         const stateKey = `${target.namespace()}/${propertyKey}`;
//         // 默认值
//         target.setState(stateKey, defaultData);
//         const actions: Actions<any> = {
//             sync: (data) => target.setState(stateKey, data),
//             get: () => target.getState(stateKey)
//         };
//         descriptor.value = actions;
//     };
// }

// 废弃
// export function MapGetter(stateKey: string): any {
//     return (target, propertyKey) => {
//         const symbolPropertyKey = Symbol(propertyKey);
//         stateEvent.on(stateKey, (payload) => {
//             console.log(11111111);
//             target[symbolPropertyKey] = payload;
//         });
//         Object.defineProperty(target, propertyKey, {
//             set: (v) => {
//                 target[symbolPropertyKey] = v;
//                 return target[symbolPropertyKey];
//             },
//             get: () => {
//                 return target[symbolPropertyKey];
//             }
//         });
//     };
// }

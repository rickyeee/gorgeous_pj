import { NC } from '../eventbus';

const WRAPPED_ON_DESTORY = 'ngOnDestroy';
export const bindSymbol = Symbol('binded');
export const subscriberSymbol = Symbol('subscriberSymbol');
const destroySymbol = Symbol('destroySymbol');
/**
 * update state to component
 * @param stateKey KEY
 * @param propertyKey property of component
 * @param prototype prototype of State
 * @param context component
 */
export function binding(stateKey, propertyKey, prototype) {
    return (context) => {
        if (stateKeyNotBinded(stateKey, context)) {
            // debugger
            const subscriber = (payload) => {
                context[propertyKey] = payload;
            };
            const subscriberId = NC.subscribe(stateKey, subscriber);
            // console.log(context.__proto__[WRAPPED_ON_DESTORY].toString());
            // debugger;
            // if (!context[destroySymbol]) {
            //     // 缓存destroy
            //     context[destroySymbol] = context.__proto__[WRAPPED_ON_DESTORY];
            //     console.log(context[destroySymbol]);
            //     // context[subscriberSymbol] = [subscriberId];
            //     // context.__proto__[WRAPPED_ON_DESTORY] = () => {
            //     //     destroyFn.call(context);
            //     //     context[subscriberSymbol].forEach(element => {
            //     //         NC.removeObserver(stateKey, element);
            //     //     });
            //     // };
            //     // return;
            // }
            if (!context[subscriberSymbol]) {
                context[subscriberSymbol] = [`${subscriberId}-${stateKey}`];
                // context.__proto__[WRAPPED_ON_DESTORY] = () => {};
                return;
            }
            if (!context[subscriberSymbol].includes(`${subscriberId}-${stateKey}`)) {
                context[subscriberSymbol].push(`${subscriberId}-${stateKey}`);
                return;
            }
            // console.log(333333);
            // has subscriberId
            // if (destroyFn && !context[subscriberSymbol].) {
            //     context[subscriberSymbol] = destroyFn;
            // } else {

            // }
            // console.log(destroyFn);
            // context.__proto__[WRAPPED_ON_DESTORY] = () => {
            //     if (destroyFn) {
            //         destroyFn.call(context.__proto__);
            //     }
            //     NC.removeObserver(stateKey, callback);
            //     clearBind(stateKey, context);
            //     // clear reference
            //     destroyFn = context[subscriberSymbol];
            // };
        }
        // return context[propertyKey] = prototype.getState(stateKey);
    };
}

/**
 * state should be binded for one time on the same component context
 */
function stateKeyNotBinded(stateKey, ctx): boolean {
    // todo：PROVENT state key being binded for many times
    if (!ctx[bindSymbol]) {
        ctx[bindSymbol] = [stateKey];
        return true;
    }
    if (ctx[bindSymbol].includes(stateKey)) {
        console.warn(`///${stateKey} has already been binded`);
        return false;
    }
    ctx[bindSymbol] = [...ctx[bindSymbol], stateKey];
    return true;
}

function clearBind(stateKey, ctx) {
    if (ctx[bindSymbol]) {
        const idx = ctx[bindSymbol].indexOf(stateKey);
        if (idx >= 0) {
            ctx[bindSymbol][idx] = null;
        }
    }
}

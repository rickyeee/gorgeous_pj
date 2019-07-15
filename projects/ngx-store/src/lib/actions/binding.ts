import { NC } from '../eventbus';
import { encode } from '../utils';

export const bindSymbol = Symbol('bindedForStore');
export const subscriberSymbol = Symbol('subscriberSymbolForStore');

/**
 * update state to component
 * @param stateKey KEY
 * @param propertyKey property of component
 * @param prototype prototype of State
 * @param context component
 */
export function binding(stateKey, propertyKey) {
    return (context) => {
        if (stateKeyNotBinded(stateKey, context)) {
            const subscriber = (payload) => {
                context[propertyKey] = payload;
            };
            const subscriberId = NC.subscribe(stateKey, subscriber);
            if (!context[subscriberSymbol]) {
                context[subscriberSymbol] = [`${subscriberId}-${stateKey}`];
                return;
            }
            if (!context[subscriberSymbol].includes(encode(subscriberId, stateKey))) {
                context[subscriberSymbol].push(encode(subscriberId, stateKey));
                return;
            }
        }
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

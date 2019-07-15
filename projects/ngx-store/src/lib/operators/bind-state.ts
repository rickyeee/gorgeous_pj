import { subscriberSymbol } from '../actions/binding';
import { NC } from '../eventbus';
import { decode } from '../utils';

const WRAPPED_ON_DESTORY = 'ngOnDestroy';
/**
 * for two-way-binding
 * @param stateKeys stateKeys
 * @param alias name of injected state service, default 'state'
 * eg: constructor(private `state`: State){}
 * @param context component instance
 */
export function bindStates(stateKeys: string[], context: any, alias?: string) {
    if (!Array.isArray(stateKeys)) {
        return console.warn('///stateKeys for binding are required///');
    }
    const stateInstance = alias ? context[alias] : context.state;
    if (stateInstance) {
        stateKeys.forEach(key => {
            stateInstance[key].bind(context);
        });
        unbindWhenDestroy(context);
    } else {
        console.warn('///DI State of Component must be named "state" when param state is missing///');
    }
}

function unbindWhenDestroy(context) {
    const destroyFn = context.__proto__[WRAPPED_ON_DESTORY];
    context.__proto__[WRAPPED_ON_DESTORY] = () => {
        if (destroyFn) {
            destroyFn.call(context);
        }
        context[subscriberSymbol].forEach(item => {
            NC.removeObserver(decode(item).key, decode(item).id);
        });
        context[subscriberSymbol] = [];
    };
}

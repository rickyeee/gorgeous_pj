import { State } from '../state';
import { subscriberSymbol } from '../actions/binding';
import { NC } from '../eventbus';

const WRAPPED_ON_DESTORY = 'ngOnDestroy';

/**
 * for two-way-binding
 * @param stateKeys stateKeys
 * @param state state
 * @param context component instance
 */
export function bindStates(stateKeys: string[], context: any, state?: State) {
    // no need for ts
    if (!Array.isArray(stateKeys)) {
        return console.warn('///stateKeys for binding are required///');
    }
    const stateInstance = state ? state : context.state;
    if (stateInstance && stateInstance instanceof State) {
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
            NC.removeObserver(item.split('-')[1], item.split('-')[0]);
        });
        context[subscriberSymbol] = [];
    };
}

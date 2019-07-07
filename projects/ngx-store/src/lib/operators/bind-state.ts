import { State } from '../state';
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
    } else {
        console.warn('///DI State of Component must be named "state" when param state is missing///');
    }
}

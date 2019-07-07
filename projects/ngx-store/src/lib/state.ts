import { stateEvent } from './eventbus';

export abstract class State {

    private static root = {};

    constructor() {}

    protected setState(key, payload) {
        // todo: for middlewares
        // log/upload data
        State.root = { ...State.root, [key]: payload };
        stateEvent.emit(key, payload);
    }

    protected getState(key) {
        // todo: for middlewares
        // log/upload data
        const state = { ...State.root };
        return state[key];
    }

    // 查看整个state
    scan() {
        return { ...State.root };
    }

    abstract namespace(): string;

}


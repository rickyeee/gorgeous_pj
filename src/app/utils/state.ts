import { stateEvent } from './event';
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
        // 返回引用
        return State.root[key];
    }

    // 查看整个state
    scan() {
        return { ...State.root };
    }

    abstract namespace(): string;

}


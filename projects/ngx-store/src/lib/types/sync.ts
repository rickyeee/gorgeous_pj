/**
 * 同步action只能触发同步行为
 */
export interface SyncActions<T> {
    sync(payload: T): void;
    get(): T;
    // 双向绑定state，跨组件同步已更新的state
    bind(context): T;
}

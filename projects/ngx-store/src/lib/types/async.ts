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

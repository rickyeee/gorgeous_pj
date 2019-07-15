import { Observable } from 'rxjs';

/**
 * async
 */
export interface AsyncActions<T> {
    // sync is compatible
    // you can use sync method to update async state
    // sync(payload: T): void;
    async(): Observable<T>;
    get(): T;
    // bind state on context(component instance)
    bind(context): T;
}

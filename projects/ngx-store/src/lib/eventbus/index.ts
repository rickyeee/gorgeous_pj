import { Subject } from 'rxjs';
import { Subscriber } from '../types/subscriber';

/**
 * Observer notification center
 */
class NotificationCenter {

    private subjects = {};

    get(name: string): Subject<any> {
        return this.subjects[name];
    }

    init<T>(name: string) {
        return this.subjects[name] = new Subject<T>();
    }

    notify(name: string, payload: any) {
        const subj = this.get(name);
        if (subj && subj.observers.length > 0) {
            this.get(name).next(payload);
            return;
        }
        // todo: else
    }

    subscribe(name: string, success: Subscriber, error?: () => void) {
        const subj = this.get(name);
        if (subj) {
            subj.subscribe(success, error);
            // register subscriber id
            return success.__id = subj.observers.length - 1;
        }
        const newSubj = this.init(name);
        newSubj.subscribe(success, error);
        return success.__id = 0;
    }

    removeObserver(name, idx) {
        const subj = this.get(name);
        subj.observers.splice(idx, 1);
        console.log(subj.observers);
    }

    unsubscribe(name: string) {
        const subj = this.get(name);
        subj.unsubscribe();
    }

    clear() {
        this.subjects = {};
    }

    /**
     * check the whole tree
     */
    scan() {
        return {
            ...this.subjects
        };
    }

}
export const NC = new NotificationCenter();

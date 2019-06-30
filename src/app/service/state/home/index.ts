import { Async, AsyncActions, Sync, SyncActions } from 'src/app/utils';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { State } from 'src/app/utils';

let num = 2;
const sideEffect = new Observable((ob) => {
    ob.next([num++]);
});

@Injectable({
    providedIn: 'root'
})
export class HomeState extends State {

    @Async([], sideEffect) test: AsyncActions<number[]>;
    @Sync(1) testSync: SyncActions<number>;

    namespace() {
        return '123';
    }

}

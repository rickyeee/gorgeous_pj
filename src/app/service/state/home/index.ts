import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { State, Async, Sync, AsyncActions, SyncActions } from 'projects/ngx-store/src/public_api';

let num = 2;
const sideEffect = new Observable<number[]>((ob) => {
    ob.next([num++]);
}).pipe(
    map(item => item.map(v => [v]))
);

@Injectable({
    providedIn: 'root'
})
export class HomeState extends State {

    @Async(sideEffect, [1]) test: AsyncActions<number[]>;
    @Sync(1) testSync: SyncActions<number>;

    namespace() {
        return '123';
    }

}

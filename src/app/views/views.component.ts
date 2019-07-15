import { HomeState } from '@/service/state';
import { Component, OnInit } from '@angular/core';
import { bindStates } from 'projects/ngx-store/src/public_api';

@Component({
    selector: 'app-views',
    templateUrl: './views.component.html',
    styleUrls: ['./views.component.less']
})
export class ViewsComponent implements OnInit {
    show = true;
    test = [];
    testSync = 0;

    interval = null;

    constructor(private state: HomeState) {
        // this.state.testSync.bind(this);
        // this.state.test.bind(this);
        bindStates(['testSync', 'test'], this);
    }

    ngOnInit() {}

    destroyChild() {
        this.show = !this.show;
    }
    clickBtn() {
        if (!this.interval) {
            this.interval = setInterval(() => {
                // set async state
                this.state.test.async()
                    .subscribe();
                // set sync state
                this.state.testSync.sync(++this.testSync);
            }, 2000);
        } else {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

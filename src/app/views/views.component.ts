import { bindStates } from 'src/app/utils';
import { HomeState } from '@/service/state';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-views',
    templateUrl: './views.component.html',
    styleUrls: ['./views.component.less']
})
export class ViewsComponent implements OnInit {
    test = [];
    testSync = 0;

    constructor(private state: HomeState) {
        bindStates(['testSync', 'test'], this);
    }

    ngOnInit() {
    }

    clickBtn() {
        this.state.test.async()
            .subscribe(res => {});
        this.state.testSync.sync(++this.testSync);
    }
}

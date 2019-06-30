import { Component, OnInit } from '@angular/core';
import { HomeState } from 'src/app/service/state';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.less']
})

export class HomeComponent implements OnInit {

    test = [];
    testSync = 0;

    constructor(private state: HomeState) {}

    ngOnInit() {
        // 双向绑定 test
        // todo: 这样不美观，可以写一个语法糖
        this.state.test.bind(this);
        this.state.testSync.bind(this);
    }

    clickTest() {
        this.state.test.async()
            .subscribe(res => {
                console.log(res);
            });
        this.state.testSync.sync(++this.testSync);
    }
}

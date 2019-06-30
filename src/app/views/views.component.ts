import { HomeState } from '@/service/state';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-views',
    templateUrl: './views.component.html',
    styleUrls: ['./views.component.less']
})
export class ViewsComponent implements OnInit {
    test = [];

    constructor(private state: HomeState) {}

    ngOnInit() {
        this.state.test.bind(this);
    }

    clickBtn() {
        this.state.test.async()
            .subscribe(res => {
                console.log(res);
            });
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeState } from 'src/app/service/state';
import { bindStates } from 'projects/ngx-store/src/public_api';

@Component({
    selector: 'app-home',
    templateUrl: './home.html',
    styleUrls: ['./home.less']
})

export class HomeComponent implements OnInit, OnDestroy {

    test = [];
    testSync = 0;

    constructor(private state: HomeState) {
        // 双向绑定 test
        // 需要在destroy时取消绑定
        // 方法1：
        // state.test.bind(this);
        // state.testSync.bind(this);
        // state.testSync.bind(this);
        // state.testSync.bind(this);
        // 方法2：
        // 自动取消绑定
        // 由于装饰器只能获取到类的原型，获取不到实例，无法通过装饰器来设置实例属性
        // 需要传入当前组件实例的上下文
        // 不传state 会默认获取context.state
        bindStates(['testSync', 'test'], this);
        // 下面这种也可以
        // bindStates(['testSync', 'test'], this, state );
    }

    ngOnInit() {
        console.log('oninit')
    }

    clickTest() {
        this.state.test.async()
            .subscribe(res => {
                console.log(res);
            });
        this.state.testSync.sync(++this.testSync);
        // console.log(this.state.testSync.get());
    }

    ngOnDestroy() {
        console.log('ondestory');
    }
}

import { ViewsRoutingModule } from './views-routing.module';
import { SharedModule } from './../shared/index';
import { NgModule } from '@angular/core';
import { ViewsComponent } from './views.component';
import { HomeComponent } from './home';
import { DashboardComponent } from './dashboard';

@NgModule({
    declarations: [
        ViewsComponent,
        HomeComponent,
        DashboardComponent
    ],
    imports: [
        SharedModule,
        ViewsRoutingModule
    ],
    exports: [
        ViewsComponent,
        HomeComponent,
        DashboardComponent
    ]
})
export class ViewsModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard';
import { HomeComponent } from './home';

const routes: Routes = [
        // { path: '', redirectTo: 'home', pathMatch: 'full' },
        {
            path: 'dashboard',
            component: DashboardComponent
        },
        {
            path: 'home',
            component: HomeComponent
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ViewsRoutingModule { }

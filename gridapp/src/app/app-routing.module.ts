import {NgModule} from '@angular/core';
import {Routes, RouterModule, ActivatedRoute} from '@angular/router';
import {AppComponent} from './app.component';
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./admin/admin.component";


const routes: Routes = [
    {
        path: 'auth', component: AuthComponent,
    },
    {
        path: '', component: AppComponent,
    },
    {
        path: 'admin', component: AdminComponent,
    },
];

// @ts-ignore
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        // ProfileRoutingModule
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

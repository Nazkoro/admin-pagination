import {NgModule} from '@angular/core';
import {Routes, RouterModule, ActivatedRoute} from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {AdminComponent} from "./admin/admin.component";


const routes: Routes = [
    {
        path: '', component: AuthComponent,
    },
    {
        path: 'admin', component: AdminComponent,
    },
];

// @ts-ignore
@NgModule({
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}

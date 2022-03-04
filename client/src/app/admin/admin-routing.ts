import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { ViewUsersComponent } from './view-users/view-users.component';


export const AdminRoutes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: '', component: ViewUsersComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forChild(AdminRoutes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}

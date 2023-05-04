import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { ViewBooksComponent } from './view-books/view-books.component';
import { ScratchComponent } from './scratch/scratch.component';


export const UserRoutes: Routes = [
    { path: '', redirectTo: 'user', pathMatch: 'full' },
    {
        path: '',
        component: UserComponent,
        children: [
            { path: '', component: ViewBooksComponent },
            { path: 'scratch', component: ScratchComponent },
            { path: '**', redirectTo: '' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(UserRoutes)],
    exports: [RouterModule],
})
export class AdminRoutingModule {
}

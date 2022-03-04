import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminRoutes } from './admin-routing';
import { SharedModule } from './../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AdminComponent } from './admin.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { TableUsersComponent } from './table-users/table-users.component';



@NgModule({
  declarations: [AdminComponent, ViewUsersComponent, TableUsersComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserRoutes } from './user-routing';
import { UserComponent } from './user.component';
import { SharedModule } from './../shared/shared.module';
import { TableComponent } from '../shared/table/table.component';
import { MatCardModule } from '@angular/material/card';
import { ViewBooksComponent } from './view-books/view-books.component';
import { TableBooksComponent } from './table-books/table-books.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ScratchComponent } from './scratch/scratch.component';


@NgModule({
  declarations: [UserComponent, TableComponent, ViewBooksComponent, TableBooksComponent, ScratchComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forChild(UserRoutes)
  ]
})
export class UserModule { }

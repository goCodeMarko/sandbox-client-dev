import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { UserRoutes } from "./user-routing";
import { UserComponent } from "./user.component";
import { SharedModule } from "../shared/shared.module";
import { TableComponent } from "../shared/table/table.component";
import { MatCardModule } from "@angular/material/card";
import { ViewBooksComponent } from "./view-books/view-books.component";
import { TableBooksComponent } from "./table-books/table-books.component";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ViewUsersComponent } from "./view-users/view-users.component";
import { MatInputModule } from "@angular/material/input";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSliderModule } from "@angular/material/slider";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";

@NgModule({
  declarations: [
    UserComponent,
    TableComponent,
    ViewBooksComponent,
    TableBooksComponent,
    ViewUsersComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTooltipModule,
    MatMenuModule,
    MatSliderModule,
    FormsModule,
    MatCheckboxModule,
    MatDividerModule,
    RouterModule.forChild(UserRoutes),
  ],
})
export class UserModule {}

import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { ViewBooksComponent } from "./view-books/view-books.component";
import { ViewUsersComponent } from "./view-users/view-users.component";

export const UserRoutes: Routes = [
  {
    path: "",
    component: UserComponent,
    children: [
      //   { path: "", redirectTo: "view-books", pathMatch: "full" },
      { path: "view-books", component: ViewBooksComponent },
      { path: "view-users", component: ViewUsersComponent },
      { path: "**", redirectTo: "view-books" },
    ],
  },
  { path: "**", redirectTo: "view-books" },
];

@NgModule({
  imports: [RouterModule.forChild(UserRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

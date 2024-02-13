import { Routes } from "@angular/router";
import { FullComponent } from "./layouts/full/full.component";
import { AdminGuard } from "./guards/admin.guard";
import { UserGuard } from "./guards/user.guard";
import { LoginComponent } from "./login/login.component";

export const AppRoutes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "",
    component: FullComponent,
    children: [
      {
        path: "user",
        loadChildren: () =>
          import("./user/user.module").then((m) => m.UserModule),
        canActivate: [UserGuard],
      },
      {
        path: "admin",
        loadChildren: () =>
          import("./admin/admin.module").then((m) => m.AdminModule),
        canActivate: [AdminGuard],
      },
    ],
  },
  { path: "**", redirectTo: "login" },
];

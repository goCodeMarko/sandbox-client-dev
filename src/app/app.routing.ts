import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full/full.component';
import { AdminGuard } from './guards/admin.guard';
import { UserGuard } from './guards/user.guard';

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {
    path: '',
    component: FullComponent,
    children: [
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [UserGuard] },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] }
    ]
  },
  { path: '**', redirectTo: 'login' }
];

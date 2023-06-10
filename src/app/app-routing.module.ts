import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/guards/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),canActivate : [AuthGuard]},
  { path: 'shop', loadChildren: () => import('./modules/shop/shop.module').then(m => m.ShopModule),canActivate : [AuthGuard]},
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

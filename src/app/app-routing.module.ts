import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'register',
    loadChildren: () =>
      import('./register/register-routing.module').then((m) => m.RegisterRoutingModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home-routing.module').then((m) => m.HomeRoutingModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile-routing.module').then((m) => m.ProfileRoutingModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin-routing.module').then((m) => m.AdminRoutingModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./products/products-routing.module').then((m) => m.ProductsRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

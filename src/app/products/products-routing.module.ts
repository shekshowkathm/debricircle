import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellmaterialsComponent } from './components/sellmaterials/sellmaterials.component';
import { BuymaterialsComponent } from './components/buymaterials/buymaterials.component';
import { DisposewasteComponent } from './components/disposewaste/disposewaste.component';
import { AuthGuard } from '../shared/auth.guard';
import { WasteManagementComponent } from './components/waste-management/waste-management.component';


const routes: Routes = [
  {
    path: 'sellmaterials',
    component: SellmaterialsComponent,
    canActivate:[AuthGuard]

  },
  {
    path: 'buymaterials',
    component: BuymaterialsComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'disposewaste',
    component: DisposewasteComponent,
    canActivate:[AuthGuard]
  },
  {
    path: 'waste-management',
    component: WasteManagementComponent,
    canActivate:[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

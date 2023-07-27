import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellmaterialsComponent } from './components/sellmaterials/sellmaterials.component';
import { BuymaterialsComponent } from './components/buymaterials/buymaterials.component';


const routes: Routes = [
  {
    path: 'sellmaterials',
    component: SellmaterialsComponent,

  },
  {
    path: 'buymaterials',
    component: BuymaterialsComponent,

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

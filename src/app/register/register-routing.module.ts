import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { RegisterlistComponent } from './component/registerlist/registerlist.component';
import { UpdateComponent } from './component/update/update.component';
import { ImageconverterComponent } from './component/imageconverter/imageconverter.component';

const routes: Routes = [
  {
    path: 'registerpage',
    component: RegisterComponent,
  },
  {
    path: 'registerlist',
    component: RegisterlistComponent,
  },
  {
    path: 'image',
    component: ImageconverterComponent,
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }

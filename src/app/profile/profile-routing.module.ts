import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaldetailsComponent } from './components/personaldetails/personaldetails.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: 'personal',
    component: PersonaldetailsComponent,
    canActivate:[AuthGuard]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

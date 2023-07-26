import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterlistComponent } from './component/registerlist/registerlist.component';
import { UpdateComponent } from './component/update/update.component';
import { ImageconverterComponent } from './component/imageconverter/imageconverter.component';


@NgModule({
  declarations: [
    RegisterComponent,
    RegisterlistComponent,
    UpdateComponent,
    ImageconverterComponent,
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,FormsModule ,
    ReactiveFormsModule
  ]
})
export class RegisterModule { }

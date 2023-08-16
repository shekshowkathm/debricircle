import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DebriheaderComponent } from './common components/debriheader/debriheader.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [DebriheaderComponent],
  imports: [
    CommonModule,MatIconModule
  ],
  exports:[
    DebriheaderComponent
  ]
})
export class SharedModule { }

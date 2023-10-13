import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SellmaterialsComponent } from './components/sellmaterials/sellmaterials.component';
import { BuymaterialsComponent } from './components/buymaterials/buymaterials.component';

// Angular material import codes
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { FilterPipe } from './pipe/filter.pipe';
import { DisposewasteComponent } from './components/disposewaste/disposewaste.component';
import { LogoutDialogComponent } from './components/logout-dialog/logout-dialog.component';
import { TippingSegregatedComponent } from './components/tipping-segregated/tipping-segregated.component';
import { TippingNonSegregatedComponent } from './components/tipping-non-segregated/tipping-non-segregated.component';
import { WasteManagementComponent } from './components/waste-management/waste-management.component'; // Import MatNativeDateModule
import { HttpClientModule } from '@angular/common/http';
import { SearchtextPipe } from './pipe/searchtext.pipe';
import { AddtocartComponent } from './components/addtocart/addtocart.component';
import { CartComponent } from './components/cart/cart.component';
import { DebriheaderComponent } from '../common components/debriheader/debriheader.component';
import { SharedModule } from '../shared.module';
import { ChangeAddressComponent } from './components/change-address/change-address.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';



@NgModule({
  declarations: [
    HeaderComponent,
    SellmaterialsComponent,
    BuymaterialsComponent,
    FilterPipe,
    DisposewasteComponent,
    LogoutDialogComponent,
    TippingSegregatedComponent,
    TippingNonSegregatedComponent,
    WasteManagementComponent,
    SearchtextPipe,
    AddtocartComponent,
    CartComponent,
    ChangeAddressComponent,
    AboutusComponent,

  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,MatNativeDateModule,
    MatPaginatorModule,FormsModule,ReactiveFormsModule,HttpClientModule,SharedModule
  ]
})
export class ProductsModule { }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TippingSegregatedComponent } from '../tipping-segregated/tipping-segregated.component';
import { TippingNonSegregatedComponent } from '../tipping-non-segregated/tipping-non-segregated.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-disposewaste',
  templateUrl: './disposewaste.component.html',
  styleUrls: ['./disposewaste.component.scss'],
})
export class DisposewasteComponent {
  nonsegregaredForm!: FormGroup; // Add the '!' non-null assertion operator here
  segregaredForm!: FormGroup; // Add the '!' non-null assertion operator here
  userId: any;
  constructor(
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private productService: ProductService
  ) {}
  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.initNonSegregatedForm();
    this.initSegregatedForm();
  }

  initNonSegregatedForm() {
    this.nonsegregaredForm = this.formBuilder.group({
      location: ['', Validators.required],
      number: ['', Validators.required],
      volume: ['', Validators.required],
      address: ['', Validators.required],
      tippingFees: [null], // Set default value as null
      userId: [this.userId],
    });
  }

  initSegregatedForm() {
    this.segregaredForm = this.formBuilder.group(
      {
        location: ['', Validators.required],
        number: ['', Validators.required],
        address: ['', Validators.required],
        concrete: [''],
        soil: [''],
        packaging: [''],
        other: [''],
        brick: [''],
        steel: [''],
        wood: [''],
        plastic: [''],
        totalVolume: [''],
        userId: [this.userId],
      },
      {
        validator: this.atLeastOneFieldRequired([
          'concrete',
          'soil',
          'packaging',
          'other',
          'brick',
          'steel',
          'wood',
          'plastic',
        ]),
      }
    );
  }

  // Custom validator function
  atLeastOneFieldRequired(fieldNames: string[]) {
    return (group: FormGroup) => {
      const filledFields = fieldNames.filter(
        (fieldName) => group.get(fieldName)?.value !== ''
      );
      if (filledFields.length === 0) {
        return { atLeastOneFieldRequired: true };
      }
      return null;
    };
  }

  calculateTippingFees(event: Event) {
    const volumeValue = parseFloat((event.target as HTMLInputElement).value);
    if (!isNaN(volumeValue)) {
      this.nonsegregaredForm.patchValue({ tippingFees: volumeValue * 2 });
    } else {
      this.nonsegregaredForm.patchValue({ tippingFees: null });
    }
  }

  calculateTipping() {
    const volumeValue = parseFloat(this.nonsegregaredForm.get('volume')!.value);
    const locationValue = this.nonsegregaredForm.get('location')!.value;

    if (!isNaN(volumeValue) && locationValue) {
      const tippingFeesValue = 150 * volumeValue + 15 * 10;
      this.nonsegregaredForm.patchValue({ tippingFees: tippingFeesValue });
    } else {
      this.nonsegregaredForm.patchValue({ tippingFees: null });
    }
  }

  onNonSegregatedSubmit() {
    // Mark all form controls as touched to trigger validation
    Object.keys(this.nonsegregaredForm.controls).forEach((controlName) => {
      this.nonsegregaredForm.controls[controlName].markAsTouched();
    });
    if (this.nonsegregaredForm.valid) {
      this.productService
        .createNonSegregated(this.nonsegregaredForm.value)
        .subscribe(
          (response: any) => {},
          (error) => {
            // Handle the error response
            console.error('POST error:', error);
          }
        );
      this.openTippingNonSegregated();
    }
  }

  onSegregatedSubmit() {
    Object.keys(this.segregaredForm.controls).forEach((controlName) => {
      this.segregaredForm.controls[controlName].markAsTouched();
    });
    if (this.segregaredForm.valid) {
      const concreteVolume = +this.segregaredForm.value.concrete || 0;
      const soilVolume = +this.segregaredForm.value.soil || 0;
      const packagingVolume = +this.segregaredForm.value.packaging || 0;
      const otherVolume = +this.segregaredForm.value.other || 0;
      const brickVolume = +this.segregaredForm.value.brick || 0;
      const steelVolume = +this.segregaredForm.value.steel || 0;
      const woodVolume = +this.segregaredForm.value.wood || 0;
      const plasticVolume = +this.segregaredForm.value.plastic || 0;

      const totalVolume =
        concreteVolume +
        soilVolume +
        packagingVolume +
        otherVolume +
        brickVolume +
        steelVolume +
        woodVolume +
        plasticVolume;

      // Set the total volume
      this.segregaredForm.value.totalVolume = totalVolume;

      this.productService.createSegregated(this.segregaredForm.value).subscribe(
        (response: any) => {},
        (error) => {
          // Handle the error response
          console.error('POST error:', error);
        }
      );
      this.openTippingSegregated();
    }
  }
  openTippingSegregated(): void {
    const dialogConfig: MatDialogConfig = {
      width: '500px', // Set the desired width here
      height: '400px', // Set the desired height here
    };

    const dialogRef = this.dialog.open(
      TippingSegregatedComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      // Add any code you want to execute after the dialog is closed (if needed)
    });
  }
  openTippingNonSegregated(): void {
    const dialogConfig: MatDialogConfig = {
      width: '500px', // Set the desired width here
      height: '400px', // Set the desired height here
    };

    const dialogRef = this.dialog.open(
      TippingNonSegregatedComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe((result) => {
      // Add any code you want to execute after the dialog is closed (if needed)
    });
  }
}

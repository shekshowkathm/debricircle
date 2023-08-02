import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TippingSegregatedComponent } from '../tipping-segregated/tipping-segregated.component';
import { TippingNonSegregatedComponent } from '../tipping-non-segregated/tipping-non-segregated.component';

@Component({
  selector: 'app-disposewaste',
  templateUrl: './disposewaste.component.html',
  styleUrls: ['./disposewaste.component.scss'],
})
export class DisposewasteComponent {
  nonsegregaredForm!: FormGroup; // Add the '!' non-null assertion operator here
  segregaredForm!: FormGroup; // Add the '!' non-null assertion operator here
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog) {}
  ngOnInit() {
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
    });
  }

  initSegregatedForm() {
    this.segregaredForm = this.formBuilder.group({
      location: ['', Validators.required],
      number: ['', Validators.required],
      address: ['', Validators.required],
      concrete: ['', ],
      soil: ['', ],
      packaging: ['', ],
      other: ['', ],
      brick: ['', ],
      steel: ['', ],
      wood: ['', ],
      plastic: ['', ],
    });
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
      const tippingFeesValue = (150 * volumeValue) + (15 * 10);
      console.log(tippingFeesValue);

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


      console.log(this.nonsegregaredForm.value);
      this.openTippingNonSegregated();
    }
  }

  onSegregatedSubmit() {
    Object.keys(this.segregaredForm.controls).forEach((controlName) => {
      this.segregaredForm.controls[controlName].markAsTouched();
    });
    if (this.segregaredForm.valid) {
      console.log(this.segregaredForm.value);
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

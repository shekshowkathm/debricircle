import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TippingSegregatedComponent } from '../tipping-segregated/tipping-segregated.component';
import { TippingNonSegregatedComponent } from '../tipping-non-segregated/tipping-non-segregated.component';


@Component({
  selector: 'app-disposewaste',
  templateUrl: './disposewaste.component.html',
  styleUrls: ['./disposewaste.component.scss']
})
export class DisposewasteComponent {


  nonsegregaredForm!: FormGroup; // Add the '!' non-null assertion operator here
  segregaredForm!: FormGroup; // Add the '!' non-null assertion operator here
  constructor(private formBuilder: FormBuilder,private dialog: MatDialog){}
  ngOnInit() {
    this.initNonSegregatedForm();
    this.initSegregatedForm();
    
  }

  initNonSegregatedForm() {
    this.nonsegregaredForm = this.formBuilder.group({
      location: ['', Validators.required],
      number: ['', Validators.required],
      volume: ['', Validators.required],

    });
  }

  initSegregatedForm(){
    this.segregaredForm = this.formBuilder.group({
      location: ['', Validators.required],
      number: ['', Validators.required],
      concrete: ['', Validators.required],
      soil: ['', Validators.required],
      packaging: ['', Validators.required],
      other: ['', Validators.required],
      brick: ['', Validators.required],
      steel: ['', Validators.required],
      wood: ['', Validators.required],
      plastic: ['', Validators.required],
    });
  }


  onNonSegregatedSubmit(){
    // Mark all form controls as touched to trigger validation
    Object.keys(this.nonsegregaredForm.controls).forEach(controlName => {
      this.nonsegregaredForm.controls[controlName].markAsTouched();
    });
    if (this.nonsegregaredForm.valid){
      console.log(this.nonsegregaredForm.value);
      this.openTippingNonSegregated();
    }
  }

  onSegregatedSubmit(){
    Object.keys(this.segregaredForm.controls).forEach(controlName => {
      this.segregaredForm.controls[controlName].markAsTouched();
    });
    if (this.segregaredForm.valid){
      console.log(this.segregaredForm.value);
      this.openTippingSegregated();
    }
  }
  openTippingSegregated(): void {

    const dialogConfig: MatDialogConfig = {
      width: '500px', // Set the desired width here
      height: '400px', // Set the desired height here
    };

    const dialogRef = this.dialog.open(TippingSegregatedComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // Add any code you want to execute after the dialog is closed (if needed)
    });
  }
  openTippingNonSegregated(): void {

    const dialogConfig: MatDialogConfig = {
      width: '500px', // Set the desired width here
      height: '400px', // Set the desired height here
    };

    const dialogRef = this.dialog.open(TippingNonSegregatedComponent,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // Add any code you want to execute after the dialog is closed (if needed)
    });
  }

}

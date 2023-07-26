import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../service/home.service';

@Component({
  selector: 'app-debriregister',
  templateUrl: './debriregister.component.html',
  styleUrls: ['./debriregister.component.scss']
})
export class DebriregisterComponent {
  registrationForm!: FormGroup; // Add the '!' non-null assertion operator here

  constructor(private formBuilder: FormBuilder,private homeService:HomeService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      address: ['', Validators.required],
      businessType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Using built-in email validator
      password: ['', [Validators.required, Validators.minLength(8)]] // Custom validator for minimum length of 8 characters
    });
  }

  onSubmit() {
    // Mark all form controls as touched to trigger validation
    Object.keys(this.registrationForm.controls).forEach(controlName => {
      this.registrationForm.controls[controlName].markAsTouched();
    });
    if (this.registrationForm.valid) {
      // Handle form submission here
      console.log(this.registrationForm.value);
      this.homeService.createRegister(this.registrationForm.value);
    }

  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../service/home.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-debriregister',
  templateUrl: './debriregister.component.html',
  styleUrls: ['./debriregister.component.scss'],
})
export class DebriregisterComponent {
  registrationForm!: FormGroup; // Add the '!' non-null assertion operator here
  hidePassword: boolean = true;
  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registrationForm = this.formBuilder.group({
      businessName: ['', Validators.required],
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      location: ['', Validators.required],
      gst: [''],
      businessType: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Using built-in email validator
      password: ['', [Validators.required, Validators.minLength(8)]], // Custom validator for minimum length of 8 characters
    });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    // Mark all form controls as touched to trigger validation
    Object.keys(this.registrationForm.controls).forEach((controlName) => {
      this.registrationForm.controls[controlName].markAsTouched();
    });
    if (this.registrationForm.valid) {
      // Handle form submission here
      // this.homeService.createRegister(this.registrationForm.value);
      this.homeService.registerCreate(this.registrationForm.value).subscribe(
        (response: any) => {
          console.log(response);
          Swal.fire(
            'Good job!',
            'Your registration has been success!',
            'success'
          );
          this.router.navigate(['/home/login']);
        },
        (error) => {
          console.log('Error:', error);
          if (error.status == 400) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Email already exists!',
            });
          }
        }
      );
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../service/home.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  hidePassword: boolean = true;
  forgotForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private router: Router
  ) {}
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.forgotForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        conformPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      {
        validators: this.passwordMatchValidator, // Add the custom validator
      }
    );
  }

  // Custom validator function
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const conformPassword = group.get('conformPassword')?.value;
    if (password !== conformPassword) {
      group.get('conformPassword')?.setErrors({ passwordMismatch: true });
    } else {
      group.get('conformPassword')?.setErrors(null);
    }
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onForgotPasswordSubmit() {
    // Mark all form controls as touched to trigger validation
    Object.keys(this.forgotForm.controls).forEach((controlName) => {
      this.forgotForm.controls[controlName].markAsTouched();
    });

    if (this.forgotForm.valid) {
      this.homeService.updatePassword(this.forgotForm.value).subscribe(
        (response: any) => {
          console.log(response);
          Swal.fire('Good job!', 'Your password updated safely!', 'success');
          this.router.navigate(['/home/login']);
        },
        (error) => {
          console.log('Error:', error);
          if (error.status == 403) {
            console.log('Invalid credentials');
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Invalid credentials !',
            });
          }
        }
      );
    }
  }
}

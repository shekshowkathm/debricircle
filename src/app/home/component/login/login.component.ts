import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../service/home.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup; // Add the '!' non-null assertion operator here
  getAllData: any;
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
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]], // Using built-in email validator
      password: ['', [Validators.required, Validators.minLength(8)]], // Custom validator for minimum length of 8 characters
    });
  }

  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }

  onLoginSubmit() {
    // Mark all form controls as touched to trigger validation
    Object.keys(this.loginForm.controls).forEach((controlName) => {
      this.loginForm.controls[controlName].markAsTouched();
    });
    if (this.loginForm.valid) {
      // Handle form submission here
      this.homeService.loginAuthenticate(this.loginForm.value).subscribe(
        (response: any) => {
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('name', response.name);
          localStorage.setItem('userId', response.userId);
          localStorage.setItem('email', response.email);
          localStorage.setItem('role', response.role);
          localStorage.setItem('index', "0"||"");
          this.router.navigate(['']);
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

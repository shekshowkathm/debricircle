import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../service/home.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm!: FormGroup; // Add the '!' non-null assertion operator here
  getAllData: any;
  constructor(private formBuilder: FormBuilder,private homeService:HomeService,private router:Router,) { }
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formBuilder.group({

      email: ['', [Validators.required, Validators.email]], // Using built-in email validator
      password: ['', [Validators.required, Validators.minLength(8)]] // Custom validator for minimum length of 8 characters
    });
  }

  onLoginSubmit(){
    // Mark all form controls as touched to trigger validation
    Object.keys(this.loginForm.controls).forEach(controlName => {
      this.loginForm.controls[controlName].markAsTouched();
    });
    if (this.loginForm.valid) {
      // Handle form submission here
      console.log(this.loginForm.value);
      this.homeService.getRegisterList().subscribe((data:any)=>{
        this.getAllData = data.map((item: any) => {
          const id = item.payload.doc.id;
          const docData = item.payload.doc.data();
          return { id, ...docData };
        });
        console.log(this.getAllData);
        const user = this.getAllData.find((u:any) => u.email === this.loginForm.value.email && u.password === this.loginForm.value.password);
        if (user) {
          console.log("Account available");
          Swal.fire(
            'Good job!',
            'Your login success',
            'success'
          )
          localStorage.setItem('email', this.loginForm.value.email);
          this.router.navigate([''])

        } else {
          console.log("Account not available");
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid credentials',
          })
        }

      })
    }

  }


}

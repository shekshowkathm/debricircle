import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileserviceService } from '../../service/profileservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss'],
})
export class PersonalinfoComponent {
  updatePersonalInfoForm!: FormGroup;
  hidePassword: boolean = true;
  isReadonly = false;
  isEditMode: boolean = false;
  isDisabled: boolean = true; // Initialize to true
  email!: string;
  userDetails:any;

  constructor(private formBuilder: FormBuilder,private router: Router,private profileService:ProfileserviceService) { }

  ngOnInit() {
    console.log(this.isDisabled);
    this.email = localStorage.getItem('email')||"";
    this.getUserDetailsByEmail();
    this.initForm();
  }

  initForm(){
    this.updatePersonalInfoForm=this.formBuilder.group({
      businessName: ['', Validators.required],
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      location: ['', Validators.required],
      gst: ['', ],
      businessType: [{ value: '',   }, Validators.required],

    })
  }

  onUpdateSubmit(){
    Object.keys(this.updatePersonalInfoForm.controls).forEach(controlName => {
      this.updatePersonalInfoForm.controls[controlName].markAsTouched();
    });
    if (this.updatePersonalInfoForm.valid) {
      console.log(this.updatePersonalInfoForm.value.businessType);
      console.log(this.updatePersonalInfoForm.value);
      this.profileService.updateData(this.updatePersonalInfoForm.value,this.email).subscribe((response:any)=>{
        console.log(response);
        localStorage.setItem('name', response.name);
        Swal.fire(
          'Good job!',
          'You details updated successfully!',
          'success'
        )
      },
      (error) => {
        console.error('Error fetching data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',

        })
      })

    }
  }


  togglePasswordVisibility(event: Event) {
    event.preventDefault();
    this.hidePassword = !this.hidePassword;
  }


  toggleReadonly() {
    this.isDisabled = !this.isDisabled;
    this.isEditMode = !this.isEditMode;
    this.isReadonly = !this.isReadonly;console.log(this.isReadonly);

  }

  getUserDetailsByEmail(){
    this.profileService.getDataByEmail(this.email).subscribe((response:any)=>{
      console.log(response);
      this.userDetails=response
      console.log(this.userDetails);
      this.populateForm(this.userDetails)

    },
    (error) => {
      console.error('Error fetching data:', error);
    }
    )
  }
  populateForm = (userData: any) => {
    console.log(userData.businessType);

    this.updatePersonalInfoForm.patchValue({
      businessName: userData.businessName,
      businessType: userData.businessType,
      name: userData.name,
      mobileNumber: userData.mobileNumber,
      location: userData.location,
      gst: userData.gst,

    });

  };

}

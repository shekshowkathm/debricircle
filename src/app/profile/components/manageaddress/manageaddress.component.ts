import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressserviceService } from '../../service/addressservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';



interface State {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-manageaddress',
  templateUrl: './manageaddress.component.html',
  styleUrls: ['./manageaddress.component.scss']
})
export class ManageaddressComponent {

  public address="addAddress"
  addressForm!: FormGroup;
  userAddress:any;
  showEditButton: boolean = false;
  addressID="";

  states: State[] = [
    { value: 'Andhra Pradesh', viewValue: 'Andhra Pradesh' },
    { value: 'Arunachal Pradesh', viewValue: 'Arunachal Pradesh' },
    { value: 'Assam', viewValue: 'Assam' },
    { value: 'Bihar', viewValue: 'Bihar' },
    { value: 'Chhattisgarh', viewValue: 'Chhattisgarh' },
    { value: 'Goa', viewValue: 'Goa' },
    { value: 'Gujarat', viewValue: 'Gujarat' },
    { value: 'Haryana', viewValue: 'Haryana' },
    { value: 'Himachal Pradesh', viewValue: 'Himachal Pradesh' },
    { value: 'Jammu and Kashmir', viewValue: 'Jammu and Kashmir' },
    { value: 'Jharkhand', viewValue: 'Jharkhand' },
    { value: 'Karnataka', viewValue: 'Karnataka' },
    { value: 'Kerala', viewValue: 'Kerala' },
    { value: 'Madhya Pradesh', viewValue: 'Madhya Pradesh' },
    { value: 'Maharashtra', viewValue: 'Maharashtra' },
    { value: 'Manipur', viewValue: 'Manipur' },
    { value: 'Meghalaya', viewValue: 'Meghalaya' },
    { value: 'Mizoram', viewValue: 'Mizoram' },
    { value: 'Nagaland', viewValue: 'Nagaland' },
    { value: 'Odisha', viewValue: 'Odisha' },
    { value: 'Punjab', viewValue: 'Punjab' },
    { value: 'Rajasthan', viewValue: 'Rajasthan' },
    { value: 'Sikkim', viewValue: 'Sikkim' },
    { value: 'Tamil Nadu', viewValue: 'Tamil Nadu' },
    { value: 'Telangana', viewValue: 'Telangana' },
    { value: 'Tripura', viewValue: 'Tripura' },
    { value: 'Uttar Pradesh', viewValue: 'Uttar Pradesh' },
    { value: 'Uttarakhand', viewValue: 'Uttarakhand' },
    { value: 'West Bengal', viewValue: 'West Bengal' },
  ];
  constructor(private formBuilder: FormBuilder,private router: Router,private addressService:AddressserviceService,private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.initForm();
    this.getUserAddress();
  }

  initForm() {
    const userIdFromLocalStorage = localStorage.getItem("userId");
    this.addressForm=this.formBuilder.group({
      name: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      pincode: ['', Validators.required],
      locality: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      landmark: ['', ],
      alternateContact: ['', ],
      state: ['', Validators.required],
      addressType: ['', Validators.required],
      userId: [userIdFromLocalStorage, ],

    })
  }



  addAddress(){
    console.log("open the forms");
    this.address="addforms"

  }
  onSubmit(){
    // Mark all form controls as touched to trigger validation
    Object.keys(this.addressForm.controls).forEach(controlName => {
      this.addressForm.controls[controlName].markAsTouched();
    });

    if (this.addressForm.valid){
      console.log(this.addressForm.value);
      this.address="addAddress"
      this.addressService.createAddress(this.addressForm.value).subscribe((response:any)=>{
        console.log(response);
        this.address="addAddress"
        this.getUserAddress();
        this.addressForm.reset();
        Swal.fire(
          'Good job!',
          'Your address saved successfully!',
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
      }
      )

    }
  }

  cancelButton(){
    this.address="addAddress"
    this.showEditButton = false;
  }

  getUserAddress(){
    const userIdFromLocalStorage = localStorage.getItem("userId");
    this.addressService.getAddressByUserID(userIdFromLocalStorage).subscribe((response:any)=>{
      console.log(response);
      this.userAddress=response.reverse();
      console.log(this.userAddress);

    },
    (error) => {
      console.error('Error retrieving user data:', error);
      // Handle error
    }
    )
  }

  deleteAddress(address:any){
    console.log(address);
    console.log(address.id);
    this.addressService.deleteAddressById(address.id).subscribe(()=>{
      console.log("deleted sucessfully");
      this.getUserAddress();
      let snackBarRef=this.snackBar.open("Address delete successfully !", "Dismiss",{duration:4000,horizontalPosition: 'start',verticalPosition: 'bottom',});
        snackBarRef.onAction().subscribe(()=>{
          console.log("the undo action is triggered");
        });
      snackBarRef.afterDismissed().subscribe(()=>{
        console.log("the snack bar dismissed");
      })
    },
    (error) => {
      console.error('Error deleting address:', error);
      // Handle error
    }
    );

  }

  editAddress(address:any){
    this.address="addforms"
    this.showEditButton = true;
    console.log(address);
    this.addressID=address.id
    console.log(this.addressID);

    this.populateFormWithData(address);

  }
  populateFormWithData(address:any) {
    this.addressForm.setValue({
      name: address.name,
      mobileNumber: address.mobileNumber,
      pincode: address.pincode,
      locality: address.locality,
      address: address.address,
      city: address.city,
      landmark: address.landmark,
      alternateContact: address.alternateContact,
      state: address.state,
      addressType: address.addressType,
      userId: address.userId,

    });
  }

  updateAddress(){
    console.log("uPDATE triggres");

    if (this.addressForm.valid){
      console.log(this.addressForm.value);
      this.addressService.updateAddressByID(this.addressForm.value,this.addressID).subscribe((response:any)=>{
        console.log(response);
        this.address="addAddress"
        this.getUserAddress();
        let snackBarRef=this.snackBar.open("Address updated successfully !", "Dismiss",{duration:4000,horizontalPosition: 'start',verticalPosition: 'bottom',});
        snackBarRef.onAction().subscribe(()=>{
          console.log("the undo action is triggered");
        });
      snackBarRef.afterDismissed().subscribe(()=>{
        console.log("the snack bar dismissed");
      })

      },
      (error) => {
        console.error('Error  update address:', error);
        // Handle error
      }
      )
    }
  }

}

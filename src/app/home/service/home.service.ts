import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private angularFireStore: AngularFirestore,private router:Router,) { }

  getRegisterById(id:any){
    return this.angularFireStore
      .collection('debricircle')
      .doc(id)
      .valueChanges();
  }

  getRegisterList(){
    return this.angularFireStore
      .collection('debricircle')
      .snapshotChanges();
  }
  createRegister(registerForm:any){
    return new Promise<any>((resolve, reject) => {
      this.angularFireStore
        .collection('debricircle')
        .add(registerForm)
        .then(
          (response: any) => {
            console.log(response);
            Swal.fire(
              'Good job!',
              'Your Registration is success!',
              'success'
            )
            this.router.navigate([''])

          },
          (error) => {reject(error)
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',

            })
          }

        );
    });
  }
  deleteRegister(registerForm:any){
    return this.angularFireStore
      .collection('debricircle')
      .doc(registerForm.id)
      .delete();
  }
  updateRegister(registerForm: any, id: any){
    return this.angularFireStore.collection('debricircle').doc(id).update({
      businessName:registerForm.businessName,
      name:registerForm.name,
      mobileNumber:registerForm.mobileNumber,
      address:registerForm.address,
      businessType:registerForm.businessType,
      email:registerForm.email,
      password:registerForm.password,
    });
  }
}

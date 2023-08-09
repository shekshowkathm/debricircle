import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  registerCreateURL = environment.localdomain + '/register/createregister';
  loginURL = environment.localdomain + '/authenticate/login';
  constructor(private angularFireStore: AngularFirestore,private router:Router,private http: HttpClient) { }

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

  createRegister(registerForm: any) {
    const email = registerForm.email; // Assuming 'email' is the key for the email field in registerForm

    // Check if the email already exists
    this.angularFireStore
      .collection('debricircle', (ref) => ref.where('email', '==', email))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (!querySnapshot) {
          // Handle the case where querySnapshot is undefined (error occurred)
          console.error('Error fetching data from Firestore');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong while fetching data from Firestore!',
          });
          return;
        }

        if (!querySnapshot.empty) {
          // Email already exists, show an error message
          Swal.fire({
            icon: 'error',
            title: 'Email Already Exists',
            text: 'The provided email address is already registered.',
          });
        } else {
          // Email is unique, proceed with registration
          this.angularFireStore
            .collection('debricircle')
            .add(registerForm)
            .then(
              (response: any) => {
                console.log(response);
                Swal.fire('Good job!', 'Your Registration is success!', 'success');
                this.router.navigate(['/home/login']);
              },
              (error) => {
                console.error(error);
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                });
              }
            );
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
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

  // getBYEmail
  getByEmail(email: string) {
    return this.angularFireStore
      .collection('debricircle', (ref) => ref.where('email', '==', email))
      .valueChanges();
  }

  registerCreate(formData: any): Observable<any>{
    return this.http.post(this.registerCreateURL, formData);
  }

  loginAuthenticate(data: any){
    return this.http.post(`${this.loginURL}`, data, {
      headers: { 'content-Type': 'application/json' },
    });
  }
}

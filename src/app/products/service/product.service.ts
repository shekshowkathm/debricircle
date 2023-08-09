import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  headers = new HttpHeaders()
    .set('content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.gettingToken()}`);

  sellMaterialsCreateURL = environment.localdomain + '/sellmaterials/createsellmaterials';


  constructor(private angularFireStore: AngularFirestore,private router:Router,private http: HttpClient) { }
  gettingToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }
  getProductById(id: any) {
    return this.angularFireStore
      .collection('products')
      .doc(id)
      .valueChanges();
  }
  getProductList() {
    return this.angularFireStore
      .collection('products')
      .snapshotChanges();
  }
  createProduct(productForm: any) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireStore
        .collection('products')
        .add(productForm)
        .then(
          (response: any) => {
            console.log(response);
            Swal.fire(
              'Good job!',
              'Your product uploaded successfully!',
              'success'
            )
            this.router.navigate([''])
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',

            })
            reject(error)}
        );
    });
  }
  deleteProduct(productForm: any) {
    return this.angularFireStore
      .collection('products')
      .doc(productForm.id)
      .delete();
  }
  updateProduct(productForm: any, id: any) {
    return this.angularFireStore.collection('products').doc(id).update({
      user:productForm.user,
      age:productForm.age
    });
  }
  createSellMaterials(sellMaterialsData:any){
    console.log(this.sellMaterialsCreateURL);
    return this.http.post(`${this.sellMaterialsCreateURL}`,sellMaterialsData,{
      headers: this.headers,
    })
  }
}

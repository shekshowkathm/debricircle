import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private angularFireStore: AngularFirestore,private router:Router,) { }
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
            this.router.navigate(['/products/buymaterials'])
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
}

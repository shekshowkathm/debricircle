import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.gettingToken()}`);

  sellMaterialsCreateURL =
    environment.localdomain + '/sellmaterials/createsellmaterials';
  getAllProductsURL =
    environment.localdomain + '/sellmaterials/claimsellmaterials';
  createCartURL = environment.localdomain + '/addtocart/createcart';
  createNonSegregatedURL =
    environment.localdomain + '/nonsegregated/createnonsegregated';
  createSegregatedURL =
    environment.localdomain + '/segregated/createsegregated';
    private baseUrl = 'http://localhost:8080/pg';

  constructor(
    private angularFireStore: AngularFirestore,
    private router: Router,
    private http: HttpClient
  ) {}
  gettingToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }
  getProductById(id: any) {
    return this.angularFireStore.collection('products').doc(id).valueChanges();
  }
  getProductList() {
    return this.angularFireStore.collection('products').snapshotChanges();
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
            );
            this.router.navigate(['']);
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            });
            reject(error);
          }
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
      user: productForm.user,
      age: productForm.age,
    });
  }
  createSellMaterials(sellMaterialsData: any) {
    const token = this.gettingToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.sellMaterialsCreateURL}`, sellMaterialsData, {
      headers,
    });
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${this.getAllProductsURL}`, {});
  }

  createCart(cartDetails: any) {
    const token = this.gettingToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.createCartURL}`, cartDetails, {
      headers
     
    });
  }

  createNonSegregated(data: any): Observable<any> {
    return this.http.post(this.createNonSegregatedURL, data, {
      headers: this.headers,
    });
  }

  createSegregated(data: any): Observable<any> {
    return this.http.post(this.createSegregatedURL, data, {
      headers: this.headers,
    });
  }

  createOrder(orderRequest: any): Observable<any> {
    const token = this.gettingToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(`${this.baseUrl}/createOrder`, orderRequest, { headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AddtocartService {
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.gettingToken()}`);

  getCartByUserIDURL = environment.localdomain + '/addtocart/getcartdetails/';
  removeCartURL = environment.localdomain + '/addtocart/removecart';
  incrementCartItem =
    environment.localdomain + '/addtocart/incrementpieceofproduct';
  decrementCartItem =
    environment.localdomain + '/addtocart/decrementpieceofproduct';

  private _currentAddress = new BehaviorSubject<number>(0);

  currentAddress$ = this._currentAddress.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    const storedIndex = localStorage.getItem('index');
    if (storedIndex !== null) {
      const indexAsNumber = parseInt(storedIndex, 10); // Parse the string as a number
      this._currentAddress.next(indexAsNumber); // Update the BehaviorSubject
    }
  }
  gettingToken() {
    return localStorage.getItem('token');
  }

  updateCurrentAddress(newValue: number): void {
    this._currentAddress.next(newValue);
  }

  getCartDetailsByUserID(id: any) {
    return this.http.get(this.getCartByUserIDURL + id, {
      headers: this.headers,
    });
  }

  deleteCartItem(userId: string, productid: String) {
    return this.http.delete(
      this.removeCartURL + '/' + userId + '/' + productid,
      {
        headers: this.headers,
      }
    );
  }

  incrementPieceOfProduct(item: any) {
    return this.http.put(this.incrementCartItem, item, {
      headers: this.headers,
    });
  }
  decrementPieceOfProduct(item: any) {
    return this.http.put(this.decrementCartItem, item, {
      headers: this.headers,
    });
  }
}

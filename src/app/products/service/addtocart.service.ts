import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.gettingToken()}`);

  getCartByUserIDURL = environment.localdomain + '/addtocart/getcartdetails/';

  constructor(private router:Router,private http: HttpClient) { }
  gettingToken() {

    return localStorage.getItem('token');
  }

  getCartDetailsByUserID(id:any){
    return this.http.get(this.getCartByUserIDURL+id,{
      headers: this.headers,
    });
  }
}

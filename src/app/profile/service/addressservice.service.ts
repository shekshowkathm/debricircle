import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressserviceService {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.gettingToken()}`);

    createAddressURL = environment.localdomain + '/address/createaddress';
    getAddressByUserIDURL = environment.localdomain + '/address/claimaddressbyuserid/';
    deleteAddressByUserIDURL = environment.localdomain + '/address/deleteaddress/';
    getAddressByIDURL = environment.localdomain + '/address/claimaddressbyid/';
    updateAddressByIDURL = environment.localdomain + '/address/updateaddress/';



    constructor(private http: HttpClient) { }
  gettingToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  createAddress(data:any): Observable<any>{
    return this.http.post(this.createAddressURL, data,{
      headers: this.headers,
    });
  }

  getAddressByUserID(userid:any){
    return this.http.get(this.getAddressByUserIDURL+userid,{
      headers: this.headers,
    });
  }

  getAddressByID(id:any){
    return this.http.get(this.getAddressByIDURL+id,{
      headers: this.headers,
    });
  }

  deleteAddressById(addressId: string): Observable<any> {
    return this.http.delete(this.deleteAddressByUserIDURL+addressId,{
      headers: this.headers,
    });
  }

  updateAddressByID(data:any,id:any): Observable<any>{
    return this.http.put(this.updateAddressByIDURL+id, data,{
      headers: this.headers,
    });
  }
}

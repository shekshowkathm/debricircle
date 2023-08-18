import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileserviceService {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.gettingToken()}`);

    getUserDetailsById = environment.localdomain + '/register/claimregisterbyid/';
    updateUserDetailsURL = environment.localdomain + '/register/updateregister/';


  constructor(private http: HttpClient) { }
  gettingToken() {
    console.log(localStorage.getItem('token'));
    return localStorage.getItem('token');
  }

  getDataByEmail(email: string): Observable<any> {
    return this.http.get<any>(this.getUserDetailsById+`${email}`,{
      headers: this.headers,
    });
  }

  updateData(data: any,email:string): Observable<any> {
    console.log();

    return this.http.put(this.updateUserDetailsURL+email, data,{
      headers: this.headers,
    }); // Replace '/update' with your actual endpoint
  }
}

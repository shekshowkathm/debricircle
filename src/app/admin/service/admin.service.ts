import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${this.gettingToken()}`);
  getAllRegisterListURL = environment.localdomain + '/register/claimregister';
  deleteUserURL = environment.localdomain + '/register/deleteregisterbyid/';
  deleteProductsURL = environment.localdomain + '/sellmaterials/deletesellmaterials/';
  deleteNonSegregatedWasteURL = environment.localdomain + '/nonsegregated/deletenonsegregated/';
  deleteSegregatedWasteURL = environment.localdomain + '/segregated/deletesegregatedwaste/';

  getAllProductsURL=environment.localdomain + '/sellmaterials/claimsellmaterials';
  getAllNonSegregatedWasteURL=environment.localdomain + '/nonsegregated/claimnonsegregated';
  getAllSegregatedWasteURL=environment.localdomain + '/segregated/claimallsegregatedwaste';

  private _currentLocation = new BehaviorSubject<string>('home');

  currentLocation$ = this._currentLocation.asObservable();

  constructor(private router:Router,private http: HttpClient) { }
  updateLocation(newLocation: string) {
    this._currentLocation.next(newLocation);


  }
  gettingToken() {

    return localStorage.getItem('token');
  }

  getAllData(): Observable<any[]>{
    return this.http.get<any[]>(this.getAllRegisterListURL,{
      headers: this.headers,
    });
  }
  getAllProductsData(): Observable<any[]>{
    return this.http.get<any[]>(this.getAllProductsURL);
  }

  deleteRegister(id:any): Observable<any>{
    return this.http.delete(this.deleteUserURL+id,{
      headers: this.headers,
    });
  }
  deleteProducts(id:any): Observable<any>{
    return this.http.delete(this.deleteProductsURL+id,{
      headers: this.headers,
    });
  }
  deleteNonSegregated(id:any): Observable<any>{
    return this.http.delete(this.deleteNonSegregatedWasteURL+id,{
      headers: this.headers,
    });
  }
  deleteSegregated(id:any): Observable<any>{
    return this.http.delete(this.deleteSegregatedWasteURL+id,{
      headers: this.headers,
    });
  }

  getAllNonSegregated(): Observable<any[]>{
    return this.http.get<any[]>(this.getAllNonSegregatedWasteURL,{
      headers: this.headers,
    });
  }
  getAllSegregated(): Observable<any[]>{
    return this.http.get<any[]>(this.getAllSegregatedWasteURL,{
      headers: this.headers,
    });
  }
}

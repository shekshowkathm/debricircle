import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const localStorageKeys = Object.keys(localStorage);
      if (localStorageKeys.length === 0) {
        // If localStorage is completely clear (no keys), deny access to the route
        this.router.navigateByUrl('');
        return false;
      }

      // If localStorage contains something (at least one key), allow access to the route
      return true;
  }

}

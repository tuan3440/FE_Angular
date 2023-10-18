import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {AppStorage} from "../../@core/service/AppStorage";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router
    ) {}

    canActivate (next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
            const userToken = AppStorage.getUserToken();
            if (!userToken) {
              this.router.navigate(['/auth/login']);
              return false;
            }
            return true;
    }

}

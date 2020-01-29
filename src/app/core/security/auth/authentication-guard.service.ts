import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { LoginService } from './login.service';
import { StateStorageService } from './state-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuardService implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private stateStorageService: StateStorageService
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
    return this.checkLogin(state.url);
  }

  checkLogin(currentRoute: string): Promise<boolean> {
    const principal = this.loginService;
    if (!currentRoute.includes('login')) {
      return Promise.resolve(
        principal.identity().then(user => {

          if (user) {
            return true;
          } else {
            this.stateStorageService.storeUrl(currentRoute);
            this.router.navigate(['login']);
          }

          return false;
        }
        ));
    } else {
      return Promise.resolve(true);
    }
  }

}

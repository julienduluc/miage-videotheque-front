import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MessagesService } from '@core/messages/messages.service';

import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationGuardService implements CanActivate {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private errorService: MessagesService
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

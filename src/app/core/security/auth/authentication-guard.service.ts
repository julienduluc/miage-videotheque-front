import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

import { MessagesService } from '../../messages/messages.service';
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
    return Promise.resolve(
      principal.identity().then(user => {

        if (user || currentRoute.includes('login')) {
          return true;
        } else {
          this.router.navigate(['login']);
        }

        return false;
      }
      ));
  }

}

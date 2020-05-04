import { Injectable } from '@angular/core';
import { NgxPermissionsService } from 'ngx-permissions';

import { UserService } from '../user/user.service';
import { AuthServerProvider } from './auth-jwt.service';

@Injectable({ providedIn: 'root' })
export class LoginService {
  errorMessage = '';

  private authenticated = true;
  private userIdentity: any;

  constructor(
    private authServerProvider: AuthServerProvider,
    private userService: UserService,
    private permissionService: NgxPermissionsService,
  ) { }

  login(credentials, callback?) {
    const cb = callback || function() { };
    return new Promise((resolve, reject) => {
      this.authServerProvider.login(credentials).subscribe(
        data => {
          this.identity(true).then(account => {
            resolve(data);
          });
          return cb();
        },
        err => {
          this.logout();
          reject(err);
          return cb(err);
        }
      );
    });
  }

  logout() {
    this.authenticated = false;
    this.userIdentity = null;
    this.authServerProvider.logout().subscribe();
  }

  identity(force?: boolean): Promise<any> {
    if (force === true) {
      this.userIdentity = undefined;
    }

    // check and see if we have retrieved the userIdentity data from the server.
    // if we have, reuse it by immediately resolving
    if (this.userIdentity) {
      return Promise.resolve(this.userIdentity);
    }

    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.userService
      .getUserInfos()
      .toPromise()
      .then(response => {
        const user = response;
        if (user) {
          this.userIdentity = user;
          this.authenticated = true;

          // Load the roles of the user
          this.permissionService.loadPermissions(user.authorities);

          return user;
        } else {
          this.userIdentity = null;
          this.authenticated = false;
        }
        return this.userIdentity;
      })
      .catch(err => {
        this.userIdentity = null;
        this.authenticated = false;
        return null;
      });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getUserIdentity() {
    return this.userIdentity;
  }

  getUserId() {
    return this.userIdentity.id;
  }
}

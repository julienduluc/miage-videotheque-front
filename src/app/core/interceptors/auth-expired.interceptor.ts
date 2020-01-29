import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '@core/security/auth/login.service';
import { UNAUTHORIZED } from 'http-status-codes';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { StateStorageService } from '../security/auth/state-storage.service';

export class AuthExpiredInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => { }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === UNAUTHORIZED && !request.url.includes('authenticate')) {
          const router: Router = this.injector.get(Router);
          const stateStorageService: StateStorageService = this.injector.get(StateStorageService);
          stateStorageService.storeUrl(router.url);

          const loginService: LoginService = this.injector.get(LoginService);
          loginService.logout();
          router.navigate(['login']);
        }
      }
    }));
  }
}

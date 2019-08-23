import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BAD_REQUEST, GATEWAY_TIMEOUT, INTERNAL_SERVER_ERROR, SERVICE_UNAVAILABLE, UNAUTHORIZED } from 'http-status-codes';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { MessagesService } from '../messages/messages.service';

/**
 * Intercepteur d'erreurs HTTP
 */
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private readonly messageService: MessagesService,
    private ngxLoadingService: NgxUiLoaderService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => { }, (err: any) => {
        this.ngxLoadingService.stopLoader('main');

        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case BAD_REQUEST:
            case INTERNAL_SERVER_ERROR:
              this.handleServerErrors(err);
              break;
            case UNAUTHORIZED:
              // this.errorService.showError('ERRORS.HTTP.UNAUTHORIZED');
              break;
            case SERVICE_UNAVAILABLE:
            case GATEWAY_TIMEOUT:
              this.messageService.showError('ERRORS.HTTP.UNAVAILABLE');
              break;
            default:
              break;
          }
        }
      })
    );
  }

  handleServerErrors(err: any) {
    if (err.error.message
      && (!err.error.message.toLowerCase().includes('failed')
        && !err.error.message.toLowerCase().includes('error')
        && !err.error.message.toLowerCase().includes('exception')
        && !err.error.message.toLowerCase().includes('java')
        && !err.error.message.toLowerCase().includes('required')
        && !err.error.message.toLowerCase().includes('spring'))) {
      this.messageService.showErrorNoTranslate(err.error.message);
    } else {
      this.messageService.showError('ERRORS.HTTP.DEFAULT');
    }
  }
}

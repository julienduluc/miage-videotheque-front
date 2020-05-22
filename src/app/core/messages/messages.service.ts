import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Message service allowing to display toasts
 */
@Injectable({ providedIn: 'root' })
export class MessagesService {

  private translateService: TranslateService;

  constructor(
    private readonly toastrService: ToastrService,
    private injector: Injector
  ) { }


  showSuccess(msg: string) {
    this.toastrService.success(msg, 'Succès', { closeButton: true, timeOut: 5000 });
  }

  showError(msg: string) {
    this.toastrService.error(msg, 'Échec', { closeButton: true, timeOut: 5000 });
  }


}

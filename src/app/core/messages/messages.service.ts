import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Message service allowing to display toasts
 */
@Injectable({ providedIn: 'root' })
export class MessagesService {

  private translateService: TranslateService;

  constructor(private readonly toastrService: ToastrService, private injector: Injector) { }

  /**
   * Green toast
   * Take one parameter that is an i18n string on this format :
   * {
   *  title: '',
   *  content: ''
   * }
   */
  showSuccess(msg: string) {
    this.translateService = this.injector.get(TranslateService);
    this.translateService.get(msg).subscribe((translation) => {
      this.toastrService.success(translation.content, translation.title, { closeButton: true, timeOut: 0 });
    });
  }

  /**
   * Green toast
   */
  showSuccessParam(title: string, content: string) {
    this.toastrService.success(content, title, { closeButton: true, timeOut: 0 });
  }

  /**
   * Red Toast
   * Take one parameter that is an i18n string on this format :
   * {
   *  content: '',
   *  title: ''
   * }
   */
  showError(msg: string) {
    this.translateService = this.injector.get(TranslateService);
    this.translateService.get(msg).subscribe((translation) => {
      this.toastrService.error(translation.content, translation.title, { closeButton: true, timeOut: 0 });
    });
  }

  /**
   * Red toast
   */
  showErrorParam(title: string, content: string) {
    this.toastrService.error(content, title, { closeButton: true, timeOut: 0 });
  }

  showErrorNoTranslate(msg: string) {
    this.toastrService.error(msg, '', { closeButton: true, timeOut: 0 });
  }
}

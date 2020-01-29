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
      this.toastrService.success(translation.CONTENT, translation.TITLE, { closeButton: true, timeOut: 5000 });
    });
  }

  /**
   * Green toast
   */
  showSuccessParam(title: string, content: string, param: any) {
    this.translateService = this.injector.get(TranslateService);
    this.translateService.get(title).subscribe((titleTranslated) => {
      this.translateService.get(content, param).subscribe((res) => {
        this.toastrService.success(res, titleTranslated, { closeButton: true, timeOut: 5000 });
      });
    });
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
      this.toastrService.error(translation.CONTENT, translation.TITLE, { closeButton: true, timeOut: 5000 });
    });
  }

  /**
   * Red toast
   */
  showErrorParam(title: string, content: string, param: any) {
    this.translateService = this.injector.get(TranslateService);
    this.translateService.get(title).subscribe((titleTranslated) => {
      this.translateService.get(content, param).subscribe((res) => {
        this.toastrService.error(res, titleTranslated, { closeButton: true, timeOut: 5000 });
      });
    });
  }

  showErrorNoTranslate(msg: string) {
    this.toastrService.error(msg, '', { closeButton: true, timeOut: 5000 });
  }

  /**
   * Green toast
   * Take one parameter that is an i18n string on this format :
   * {
   *  title: '',
   *  content: ''
   * }
   */
  showWarning(msg: string) {
    this.translateService = this.injector.get(TranslateService);
    this.translateService.get(msg).subscribe((translation) => {
      this.toastrService.error(translation.CONTENT, translation.TITLE,
        { closeButton: true, timeOut: 5000 });
    });
  }
}

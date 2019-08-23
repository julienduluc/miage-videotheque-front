import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

/**
 * Service d'erreur permettant d'afficher des toasts
 */
@Injectable({ providedIn: 'root' })
export class MessagesService {

  private translateService: TranslateService;

  constructor(private readonly toastrService: ToastrService, private injector: Injector) { }

  /**
   * Toast vert
   * Prend en paramètre un string i18n au format
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
   * Toast vert
   * @param title : Titre du toast
   * @param content : Contenu dynamique du toast
   */
  showSuccessParam(title: string, content: string) {
    this.toastrService.success(content, title, { closeButton: true, timeOut: 0 });
  }

  /**
  * Toast rouge
  * Prend en paramètre un string i18n au format
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
   * Toast rouge
   * @param title : Titre du toast
   * @param content : Contenu dynamique du toast
   */
  showErrorParam(title: string, content: string) {
    this.toastrService.error(content, title, { closeButton: true, timeOut: 0 });
  }

  showErrorNoTranslate(msg: string) {
    this.toastrService.error(msg, '', { closeButton: true, timeOut: 0 });
  }
}

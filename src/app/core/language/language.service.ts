import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLang = 'en';

  constructor(
    private translateService: TranslateService,
    private ngxLoadingService: NgxUiLoaderService
  ) {
    this.init();
  }

  init() {
    this.currentLang = 'fr';
    this.translateService.setDefaultLang(this.currentLang);
    this.translateService.use(this.currentLang);
  }

  changeLanguage(languageKey: string) {
    this.currentLang = languageKey;
    this.translateService.use(this.currentLang);
    this.ngxLoadingService.stopLoader('main');
  }

  getCurrent(): Promise<string> {
    return Promise.resolve(this.currentLang);
  }
}

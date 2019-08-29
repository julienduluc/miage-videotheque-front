import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/core/language/language.service';
import { LoginService } from 'src/app/core/security/auth/login.service';

import { LanguageHelper } from './../../core/language/language.helper';

@Component({
  selector: 'myApp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  languages: string[];

  constructor(
    private loginService: LoginService,
    private languageHelper: LanguageHelper,
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });
  }

  isAuthenticated() {
    return this.loginService.isAuthenticated();;
  }

  changeLanguage(languageKey: string) {
    this.languageService.changeLanguage(languageKey);
  }

  logout() {
    this.loginService.logout();
  }
}

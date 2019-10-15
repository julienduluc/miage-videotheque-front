import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LanguageHelper } from 'src/app/core/language/language.helper';
import { LanguageService } from 'src/app/core/language/language.service';

import { LoginComponent } from './login.component';
import { loginRouting } from './login.routing';

@NgModule({
  imports: [
    SharedModule,
    NgxPermissionsModule.forChild(),
    loginRouting
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    {
      provide: LanguageService,
      useClass: LanguageService
    }
  ],
  entryComponents: [
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
  ],
})
export class LoginModule {
  constructor(private languageService: LanguageService, private languageHelper: LanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { LanguageHelper } from '@core/language/language.helper';
import { LanguageService } from '@core/language/language.service';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SharedModule } from 'primeng/api/shared';

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    NgxPermissionsModule.forChild(),
  ],
  exports: [],
  providers: [
    {
      provide: LanguageService,
      useClass: LanguageService
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
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

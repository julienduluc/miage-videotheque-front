import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LanguageHelper } from 'src/app/core/language/language.helper';
import { LanguageService } from 'src/app/core/language/language.service';

import { HomeComponent } from './home.component';
import { homeRouting } from './home.routing';
import { HomeService } from './home.service';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    NgxPermissionsModule.forChild(),
    homeRouting
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    {
      provide: LanguageService,
      useClass: LanguageService
    },
    HomeService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
  ],
})
export class HomeModule {
  constructor(private languageService: LanguageService, private languageHelper: LanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}

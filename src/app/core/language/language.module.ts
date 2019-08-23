import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LanguageService } from './language.service';


export function translateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [HttpClient]
      },
    }),
    CommonModule,
  ],
  declarations: [
  ],
  exports: [
    TranslateModule,
    CommonModule,
  ]
})
export class LanguageModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LanguageModule,
      providers: [
        {
          provide: LanguageService,
          useClass: LanguageService,
          deps: [TranslateService]
        },
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: LanguageModule,
      providers: []
    };
  }
}

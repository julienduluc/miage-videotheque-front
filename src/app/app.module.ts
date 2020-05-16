import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import localeFr from '@angular/common/locales/fr';
import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from '@core/auth/interceptor.service';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LanguageModule } from './core/language/language.module';
import { LayoutsModule } from './layouts/layout.module';
import { SharedModule } from './shared/shared.module';

registerLocaleData(localeFr, 'fr-FR');
@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LayoutsModule,
    SharedModule.forRoot(),
    LanguageModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    HttpClientModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

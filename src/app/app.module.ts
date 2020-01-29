import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthExpiredInterceptor } from '@core/interceptors/auth-expired.interceptor';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ErrorService } from './core/errors/error.service';
import { AuthInterceptor } from './core/interceptors/auth-interceptor.service';
import { ErrorHandlerInterceptor } from './core/interceptors/errorhandler.interceptor';
import { LanguageModule } from './core/language/language.module';
import { MessagesService } from './core/messages/messages.service';
import { LayoutsModule } from './layouts/layout.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    LayoutsModule,
    SharedModule.forRoot(),
    LanguageModule.forRoot(),
    NgxPermissionsModule.forRoot(),

  ],
  declarations: [
    AppComponent
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'fr-FR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
      deps: [
        MessagesService,
        NgxUiLoaderService,
        ErrorService
      ]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true,
      deps: [
        Injector
      ]
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@core/auth/auth.service';
import { AuthInterceptor } from '@core/auth/interceptor.service';
import { NgxPermissionsModule } from 'ngx-permissions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmComponent } from './components/film/film.component';
import { CoreModule } from './core/core.module';
import { LanguageModule } from './core/language/language.module';
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
    AppComponent,
    FilmComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

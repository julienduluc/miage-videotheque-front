import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { LanguageHelper } from '@core/language/language.helper';
import { LanguageService } from '@core/language/language.service';
import { SharedModule } from '@shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';

import { ProfilListsComponent } from './profil-lists/profil-lists.component';
import { ProfilRatingsComponent } from './profil-ratings/profil-ratings.component';
import { ProfilComponent } from './profil.component';
import { profilRouting } from './profil.routing';
import { ProfilService } from './profil.service';
import { ProfilFavoriteComponent } from './profil-favorite/profil-favorite.component';
import { ProfilWatchlistComponent } from './profil-watchlist/profil-watchlist.component';

@NgModule({
  declarations: [
    ProfilComponent,
    ProfilListsComponent,
    ProfilRatingsComponent,
    ProfilFavoriteComponent,
    ProfilWatchlistComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    NgxPermissionsModule.forChild(),
    profilRouting
  ],
  exports: [],
  providers: [
    {
      provide: LanguageService,
      useClass: LanguageService
    },
    ProfilService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfilModule {
  constructor(private languageService: LanguageService, private languageHelper: LanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}

import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { LanguageHelper } from '@core/language/language.helper';
import { LanguageService } from '@core/language/language.service';
import { SharedModule } from '@shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';

import { ProfilExterneComponent } from './profil-externe/profil-externe.component';
import { ProfilFavoriteComponent } from './profil-favorite/profil-favorite.component';
import { ProfilListsModalComponent } from './profil-lists/profil-lists-modal/profil-lists-modal.component';
import { ProfilListsComponent } from './profil-lists/profil-lists.component';
import { ProfilListsService } from './profil-lists/profil-lists.service';
import { ProfilRatingsComponent } from './profil-ratings/profil-ratings.component';
import { ProfilWatchlistComponent } from './profil-watchlist/profil-watchlist.component';
import { ProfilComponent } from './profil.component';
import { profilRouting } from './profil.routing';
import { ProfilService } from './profil.service';
import { ProfiListsDetailsComponent } from './profil-lists/profi-lists-details/profi-lists-details.component';

@NgModule({
  declarations: [
    ProfilComponent,
    ProfilListsComponent,
    ProfilRatingsComponent,
    ProfilFavoriteComponent,
    ProfilWatchlistComponent,
    ProfilListsModalComponent,
    ProfilExterneComponent,
    ProfiListsDetailsComponent
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
    ProfilService,
    ProfilListsService
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

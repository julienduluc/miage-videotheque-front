import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfilListsService } from '@components/profil/profil-lists/profil-lists.service';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';
import { LanguageHelper } from 'src/app/core/language/language.helper';
import { LanguageService } from 'src/app/core/language/language.service';

import { FilmComponent } from './film.component';
import { filmRouting } from './film.routing';
import { ReviewComponent } from './review/review.component';
import { DialogComponent } from './tools/dialog/dialog.component';

@NgModule({
  declarations: [FilmComponent, ReviewComponent, DialogComponent],
  imports: [CoreModule, SharedModule, NgxPermissionsModule.forChild(), filmRouting, MatDialogModule],
  entryComponents: [DialogComponent],
  exports: [],
  providers: [
    {
      provide: LanguageService,
      useClass: LanguageService
    },
    ProfilListsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FilmModule {
  constructor(private languageService: LanguageService, private languageHelper: LanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}

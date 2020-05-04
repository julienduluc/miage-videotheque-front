import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ImportComponent } from './components/import/import.component';
import { ImportService } from './components/import/import.service';
import { PermissionDirective } from './directives/permission.directive';
import { FileDownloadService } from './services/file-download.service';
import { FilmsService } from './services/films.service';
import { UtilsService } from './services/utils.service';
import { SharedCommonModule } from './shared-common.module';
import { SharedLibsModule } from './shared-libs.module';

@NgModule({
  imports: [RouterModule, SharedLibsModule, SharedCommonModule],
  declarations: [
    ConfirmationDialogComponent,
    PermissionDirective,
    ImportComponent
  ],
  providers: [
    FileDownloadService,
    ImportService,
    UtilsService
  ],
  exports: [
    SharedCommonModule,
    ConfirmationDialogComponent,
    PermissionDirective,
    ImportComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [FilmsService]
    };
  }
}

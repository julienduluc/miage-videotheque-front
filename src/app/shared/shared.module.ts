import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonComponent } from './components/button/button.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { ErrorComponent } from './components/error/error.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { ImportComponent } from './components/import/import.component';
import { ImportService } from './components/import/import.service';
import { FormErrorDirective } from './directives/form-error.directive';
import { PermissionDirective } from './directives/permission.directive';
import { FileDownloadService } from './services/file-download.service';
import { UtilsService } from './services/utils.service';
import { SharedCommonModule } from './shared-common.module';
import { SharedLibsModule } from './shared-libs.module';

@NgModule({
  imports: [RouterModule, SharedLibsModule, SharedCommonModule],
  declarations: [
    ConfirmationDialogComponent,
    ButtonComponent,
    ExpansionComponent,
    FormErrorDirective,
    PermissionDirective,
    ErrorComponent,
    FormErrorComponent,
    ImportComponent
  ],
  providers: [
    FileDownloadService,
    ImportService,
    UtilsService
  ],
  entryComponents: [
    ConfirmationDialogComponent,
  ],
  exports: [
    SharedCommonModule,
    ConfirmationDialogComponent,
    ButtonComponent,
    ExpansionComponent,
    FormErrorDirective,
    PermissionDirective,
    ErrorComponent,
    FormErrorComponent,
    ImportComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [
      ]
    };
  }
}

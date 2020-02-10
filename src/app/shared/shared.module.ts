import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { InputComponent } from '@sharedComponents/custom-input/input.component';
import { SelectComponent } from '@sharedComponents/custom-select/select.component';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { SelectDialogComponent } from './components/custom-select/dialog/select-dialog.component';
import { ErrorComponent } from './components/error/error.component';
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
    FormErrorDirective,
    PermissionDirective,
    ErrorComponent,
    FormErrorComponent,
    ImportComponent,
    SelectComponent,
    SelectDialogComponent,
    InputComponent
  ],
  providers: [
    FileDownloadService,
    ImportService,
    UtilsService
  ],
  entryComponents: [
    ConfirmationDialogComponent,
    SelectDialogComponent
  ],
  exports: [
    SharedCommonModule,
    ConfirmationDialogComponent,
    FormErrorDirective,
    PermissionDirective,
    ErrorComponent,
    FormErrorComponent,
    ImportComponent,
    SelectComponent,
    InputComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
        ngModule: SharedModule,
        providers: []
    };
}
}

import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountListsViewComponent } from '@sharedComponents/account-lists-view/account-lists-view.component';

import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { PermissionDirective } from './directives/permission.directive';
import { AccountService } from './services/account.service';
import { FilmsService } from './services/films.service';
import { UtilsService } from './services/utils.service';
import { SharedCommonModule } from './shared-common.module';
import { SharedLibsModule } from './shared-libs.module';

@NgModule({
  imports: [RouterModule, SharedLibsModule, SharedCommonModule],
  declarations: [
    ConfirmationDialogComponent,
    PermissionDirective,
    AccountListsViewComponent
  ],
  providers: [
    UtilsService,
    AccountService
  ],
  exports: [
    SharedCommonModule,
    ConfirmationDialogComponent,
    PermissionDirective,
    AccountListsViewComponent
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

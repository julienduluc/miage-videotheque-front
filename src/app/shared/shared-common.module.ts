import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { SharedLibsModule } from './shared-libs.module';

@NgModule({
  imports: [
    SharedLibsModule
  ],
  declarations: [
  ],
  providers: [],
  entryComponents: [
  ],
  exports: [
    SharedLibsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedCommonModule { }

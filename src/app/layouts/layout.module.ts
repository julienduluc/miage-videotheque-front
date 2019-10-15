import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@core/core.module';
import { SharedModule } from '@shared/shared.module';
import { NgxPermissionsModule } from 'ngx-permissions';

import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    RouterModule,
    NgxPermissionsModule.forChild()
  ],
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent
  ],
})
export class LayoutsModule { }

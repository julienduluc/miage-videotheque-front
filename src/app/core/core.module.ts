import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';

@NgModule({
  imports: [HttpClientModule],
  declarations: [FindLanguageFromKeyPipe],
  providers: [
  ],
  exports: [FindLanguageFromKeyPipe],
})
export class CoreModule { }

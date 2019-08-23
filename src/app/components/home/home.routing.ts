import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationGuardService } from './../../core/security/auth/authentication-guard.service';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthenticationGuardService],
    data: { pageTitle: 'HOME.PAGE_TITLE' }
  }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(routes);

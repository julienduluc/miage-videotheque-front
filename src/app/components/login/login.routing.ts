import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from '@core/security/auth/authentication-guard.service';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthenticationGuardService],
    data: { pageTitle: 'LOGIN.PAGE_TITLE' }
  }
];

export const loginRouting: ModuleWithProviders = RouterModule.forChild(routes);

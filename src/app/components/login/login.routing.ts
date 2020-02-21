import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [],
    data: { pageTitle: 'LOGIN.PAGE_TITLE' }
  }
];

export const loginRouting: ModuleWithProviders = RouterModule.forChild(routes);

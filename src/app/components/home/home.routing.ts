import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [],
    data: { pageTitle: 'Accueil' }
  },
  {
    path: 'approved',
    component: HomeComponent,
    canActivate: [],
    data: { pageTitle: 'Accueil' }
  }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(routes);

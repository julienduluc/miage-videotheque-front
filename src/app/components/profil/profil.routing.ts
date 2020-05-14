import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilComponent } from './profil.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilComponent,
    canActivate: [],
    data: { pageTitle: 'HOME.PAGE_TITLE', tab: 0 }
  },
  {
    path: 'ratings',
    component: ProfilComponent,
    canActivate: [],
    data: { pageTitle: 'HOME.PAGE_TITLE', tab: 1 }
  },
  {
    path: 'favorite',
    component: ProfilComponent,
    canActivate: [],
    data: { pageTitle: 'HOME.PAGE_TITLE', tab: 2 }
  },
  {
    path: 'lists',
    component: ProfilComponent,
    canActivate: [],
    data: { pageTitle: 'HOME.PAGE_TITLE', tab: 3 }
  },
  {
    path: 'watchlist',
    component: ProfilComponent,
    canActivate: [],
    data: { pageTitle: 'HOME.PAGE_TITLE', tab: 4 }
  },


];

export const profilRouting: ModuleWithProviders = RouterModule.forChild(routes);

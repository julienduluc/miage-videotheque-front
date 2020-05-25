import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfilExterneComponent } from './profil-externe/profil-externe.component';
import { ProfiListsDetailsComponent } from './profil-lists/profi-lists-details/profi-lists-details.component';
import { ProfilComponent } from './profil.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ProfilComponent,
        canActivate: [],
        data: { pageTitle: 'Profil', tab: 0 }
      },
      {
        path: 'ratings',
        component: ProfilComponent,
        canActivate: [],
        data: { pageTitle: 'Notes', tab: 1 }
      },
      {
        path: 'favorite',
        component: ProfilComponent,
        canActivate: [],
        data: { pageTitle: 'Favoris', tab: 2 }
      },
      {
        path: 'lists',
        component: ProfilComponent,
        canActivate: [],
        data: { pageTitle: 'Listes', tab: 3 }
      },
      {
        path: 'lists/:id',
        component: ProfiListsDetailsComponent,
        canActivate: [],
        data: { pageTitle: 'Détails Liste' }
      },
      {
        path: 'watchlist',
        component: ProfilComponent,
        canActivate: [],
        data: { pageTitle: 'Suivis', tab: 4 }
      },
      {
        path: 'ext/:id',
        component: ProfilExterneComponent,
        canActivate: [],
        data: { pageTitle: 'Profil' }
      },
    ]
  }
];

export const profilRouting: ModuleWithProviders = RouterModule.forChild(routes);

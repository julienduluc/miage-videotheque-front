import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FilmComponent } from './film.component';

const routes: Routes = [
  {
    path: '',
    component: FilmComponent,
    canActivate: [],
    data: { pageTitle: 'HOME.PAGE_TITLE' }
  },
  {
    path: ':id',
    component: FilmComponent,
    canActivate: [],
    data: { pageTitle: 'HOME.PAGE_TITLE' }
  }

];

export const filmRouting: ModuleWithProviders = RouterModule.forChild(routes);

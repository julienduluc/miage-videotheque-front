import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: '**', redirectTo: 'actualites' },
  {
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    canActivate: []
  },
  {
    path: 'film',
    loadChildren: () => import('./components/film/film.module').then(m => m.FilmModule),
    canActivate: []
  },
  {
    path: 'profil',
    loadChildren: () => import('./components/profil/profil.module').then(m => m.ProfilModule),
    canActivate: []
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

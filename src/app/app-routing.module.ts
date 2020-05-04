import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: '**', redirectTo: 'actualites' },
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    canActivate: []
  },
  {
    path: 'film',
    loadChildren: () => import('./components/film/film.module').then(m => m.FilmModule),
    canActivate: []
  }
  ,
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
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

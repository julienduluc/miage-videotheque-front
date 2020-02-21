import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuardService } from '@core/security/auth/authentication-guard.service';

const ROUTES: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // { path: '**', redirectTo: 'actualites' },
  {
    path: '',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthenticationGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
    canActivate: [AuthenticationGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(ROUTES)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

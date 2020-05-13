import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API, API_PERMISSION, APP_URL } from '@core/constants/app.constant';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';

// const httpParams = new HttpParams().set('api_key', API_KEY);

@Injectable({ providedIn: 'root' })
export class AuthService {

  public _isAuthenticated = new BehaviorSubject<any>(null);
  public accountId: number;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private route: Router,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
  ) {

    if (this.sessionStorage.retrieve('sessionId')) {
      this.isAuthenticated = true;
    }
  }

  public get isAuthenticated(): boolean {
    return this._isAuthenticated.getValue();
  }

  public set isAuthenticated(auth: boolean) {
    this._isAuthenticated.next(auth);
  }


  /**
   *  Etape 1
   */
  createRequestToken(): void {

    // Demande un token
    this.http.get<any>(API + 'authentication/token/new').subscribe((object) => {
      if (object.success) {

        // Redirige vers le formulaire de connexion TMDB
        this.document.location.href = API_PERMISSION + object.request_token + '?redirect_to=' + APP_URL + this.route.url;
      } else { }
    });
  }

  /**
   *  Etape 2
   * @param requestToken : token contenu dans l'url
   */
  createSession(requestToken: any): void {

    // Créer la session pour un utilisateur connecté
    this.http.post<any>(API + 'authentication/session/new', { request_token: requestToken })
      .subscribe((session) => {
        if (session.success) {
          this.localStorage.store('sessionId', session.session_id);
          this.sessionStorage.store('sessionId', session.session_id);
          this.isAuthenticated = true;
        }
      });
  }

  logout(): void {
    this.localStorage.clear('sessionId');
    this.sessionStorage.clear('sessionId');
    this.isAuthenticated = false;
  }
}

import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { API, API_KEY, API_PERMISSION, APP_URL } from '@core/constants/app.constant';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

let httpParams = new HttpParams().set('api_key', API_KEY);
const httpOptions = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class AuthService {

  public _auth = new BehaviorSubject<any>(null);
  public accountId: number;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private route: Router,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService,
  ) {

    if (this.sessionStorage.retrieve('sessionId')) {
      this.auth = true;
    }
  }

  public get auth(): boolean {
    return this._auth.getValue();
  }

  public set auth(auth: boolean) {
    this._auth.next(auth);
  }



  isAuthenticated(): boolean {
    // return this._sessionId ? true : false;
    return this.auth;
  }


  /**
   *  Etape 1
   */
  createRequestToken(): void {

    // Demande un token
    this.http.get<any>(API + 'authentication/token/new', { params: httpParams }).subscribe((object) => {
      if (object.success) {

        // Redirige vers le formulaire de connexion TMDB
        this.document.location.href = API_PERMISSION + object.request_token + '?redirect_to=' + APP_URL + '/home';
      } else { }
    });
  }

  /**
   *  Etape 2
   * @param requestToken : token contenu dans l'url
   */
  createSession(requestToken: any): void {

    // Créer la session pour un utilisateur connecté
    console.log('token', requestToken);
    this.http.post<any>(API + 'authentication/session/new', { request_token: requestToken }, { params: httpParams })
      .toPromise().then((session) => {
        if (session.success) {
          this.auth = true;
          this.localStorage.store('sessionId', session.session_id);
          this.sessionStorage.store('sessionId', session.session_id);

          this.getAccountDetails().subscribe((account) => {

            this.accountId = account.id;
          });
        }
      });
  }

  logout(): void {
    this.auth = false;
    this.localStorage.clear('sessionId');
    this.sessionStorage.clear('sessionId');
  }

  getAccountDetails(): Observable<any> {
    httpParams = httpParams.append('session_id', this.localStorage.retrieve('sessionId'));

    return this.http.get<any>(API + 'account', { params: httpParams });
  }
}

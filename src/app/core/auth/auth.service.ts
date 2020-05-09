import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { API, API_KEY, API_PERMISSION, APP_URL } from '@core/constants/app.constant';

const httpParams = new HttpParams().set('api_key', API_KEY);

@Injectable()
export class AuthService {

  private _sessionId: any;

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) { }

  public get sessionId(): any {
    return this._sessionId;
  }

  public set sessionId(sessionId: any) {
    this._sessionId = sessionId;
  }

  isAuthenticated(): boolean {
    return this.sessionId ? true : false;
  }

  /**
   *  Etape 1
   */
  createRequestToken(): void {

    // Demande un token
    this.http.get<any>(API + 'authentication/token/new', { params: httpParams }).subscribe((object) => {
      if (object.success) {

        // Redirige vers le formulaire de connexion TMDB
        this.document.location.href = API_PERMISSION + object.request_token + '?redirect_to=' + APP_URL + 'approved';
      } else { }
    });
  }

  /**
   *  Etape 2
   * @param requestToken : token contenu dans l'url
   */
  createSession(requestToken: any): void {

    // Créer la session pour un utilisateur connecté
    this.http.post<any>(API + 'authentication/session/new', { request_token: requestToken }, { params: httpParams })
      .subscribe((session) => {
        if (session.success) {
          this.sessionId = session.session_id;
          localStorage.setItem('sessionId', this.sessionId);
        } else {

        }
      });
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/app.constant';
import { SessionStorageService } from 'ngx-webstorage';
import { forkJoin, Observable } from 'rxjs';

const httpOptions = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class AccountService {

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) { }

  private url = 'account';

  getAccountDetails(): Observable<any> {
    const queryParams = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    return this.http.get<any>(API + this.url, { params: queryParams });
  }

  addFavorite(idFilm: number): Observable<any> {
    const queryParams = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    const body = {
      media_type: 'movie',
      media_id: idFilm,
      favorite: true
    };
    return this.http.post<any>(API + 'account/null/favorite', body, { params: queryParams });
  }

  getAccountRatings(order?: string): Observable<any> {
    const queryParams = new HttpParams()
      .append('session_id', this.sessionStorage.retrieve('sessionId'))
      .append('sort_by', 'created_at.' + order)
      .append('language', 'fr-FR');

    return this.http.get<any>(API + this.url + '/null/rated/movies', { params: queryParams });
  }

  getAccountFavorite(order?: string): Observable<any> {
    const queryParams = new HttpParams()
      .append('session_id', this.sessionStorage.retrieve('sessionId'))
      .append('sort_by', 'created_at.' + order)
      .append('language', 'fr-FR');

    return this.http.get<any>(API + this.url + '/null/favorite/movies', { params: queryParams });
  }

  getAccountLists(order?: string): Observable<any> {
    const queryParams = new HttpParams()
      .append('session_id', this.sessionStorage.retrieve('sessionId'))
      .append('sort_by', 'created_at.' + order)
      .append('language', 'fr-FR');

    return this.http.get<any>(API + this.url + '/null/lists', { params: queryParams });
  }

  getAccountWatchlist(order?: string): Observable<any> {
    const queryParams = new HttpParams()
      .append('session_id', this.sessionStorage.retrieve('sessionId'))
      .append('sort_by', 'created_at.' + order)
      .append('language', 'fr-FR');

    return this.http.get<any>(API + this.url + '/null/watchlist/movies', { params: queryParams });
  }

  getAccountMultiples(): Observable<any> {
    return forkJoin([this.getAccountRatings('desc'), this.getAccountFavorite('desc'),
    this.getAccountLists('desc'), this.getAccountWatchlist('desc')]);
  }
}

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
    const param = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    return this.http.get<any>(API + this.url, { params: param });
  }

  addFavorite(idFilm: number): Observable<any> {
    const param = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    const body = {
      media_type: 'movie',
      media_id: idFilm,
      favorite: true
    };
    return this.http.post<any>(API + 'account/null/favorite', body, { params: param });
  }

  getAccountLists(): Observable<any> {
    const param = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    return this.http.get<any>(API + this.url + '/null/lists', { params: param });
  }

  getAccountRatings(asc?: boolean): Observable<any> {
    let param = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    if (asc) {
      param = param.append('sort_by', 'created_at.asc');
    } else {
      param = param.append('sort_by', 'created_at.desc');
    }

    return this.http.get<any>(API + this.url + '/null/rated/movies', { params: param });
  }


  getAccountFavorite(): Observable<any> {
    /*let param = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    if (asc) {
      param = param.append('sort_by', 'created_at.asc');
    } else {
      param = param.append('sort_by', 'created_at.desc');
    }
*/
    return this.http.get<any>(API + this.url + '/null/favorite/movies');
  }

  getAccountListsAndRatingsAndWatchlist(): Observable<any> {
    const param = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    const req1 = this.http.get<any>(API + this.url + '/null/lists', { params: param });
    const req2 = this.http.get<any>(API + this.url + '/null/rated/movies', { params: param });
    const req3 = this.http.get<any>(API + this.url + '/null/watchlist/movies', { params: param });
    const req4 = this.http.get<any>(API + this.url + '/null/favorite/movies', { params: param });

    return forkJoin([req1, req2, req3, req4]);
  }
}

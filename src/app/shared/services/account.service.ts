import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/app.constant';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

const httpOptions = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class AccountService {

  private url = 'account';

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) { }

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
}

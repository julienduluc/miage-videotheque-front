import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API, API_KEY } from '@core/constants/app.constant';
import { Film } from '@shared/models/film.model';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class FilmsService {

  private urlSearch = 'https://api.themoviedb.org/3/search/movie';
  private urlMovie = 'https://api.themoviedb.org/3/movie/';

  public currentFilm$ = new BehaviorSubject<Film>(null);

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private sessionStorage: SessionStorageService
  ) { }

  getCreditsByFilmId(id: number): Observable<any> {
    return this.http.get<any>(this.urlMovie + id + '/credits', { headers: httpOptions, params: param });
  }
  getCurrentFilm() {
    return this.currentFilm$.getValue();
  }

  setCurrentFilm(film: Film) {
    this.currentFilm$.next(film);
  }

  /**
   * Liste de films pas titre
   * @param name : titre du film
   */
  getFilmsByName(name: string): Observable<any> {
    let param = new HttpParams().append('query', name);
    param = param.append('api_key', API_KEY);

    return this.http.get<any>(this.urlSearch, { headers: httpOptions, params: param });
  }


  /**
   * Film par id
   * @param id : id film
   */
  getFilmById(id: number): Observable<Film> {
    const param = new HttpParams().append('api_key', API_KEY);
    return this.http.get<any>(this.urlMovie + id, { headers: httpOptions, params: param });
  }

  markFav(idFilm: number): Observable<any> {
    let param = new HttpParams().append('api_key', API_KEY);
    param = param.append('session_id', this.localStorage.retrieve('sessionId'));
    const body = {
      media_type: 'movie',
      media_id: idFilm,
      favorite: true
    };

    return this.http.post<any>(API + 'account/null/favorite', body, { headers: httpOptions, params: param });
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '@shared/models/film.model';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
let param = new HttpParams().set('api_key', 'e6fa63e454efad680e9c890b9dc30a88');


@Injectable()
export class FilmsService {

  private urlSearch = 'https://api.themoviedb.org/3/search/movie';
  private urlMovie = 'https://api.themoviedb.org/3/movie/';

  private apiKey = 'e6fa63e454efad680e9c890b9dc30a88';

  public currentFilm$ = new BehaviorSubject<Film>(null);

  constructor(
    private http: HttpClient
  ) { }

  getFilmsByName(name: string): Observable<any> {
    param = param.append('query', name);
    return this.http.get<any>(this.urlSearch, { headers: httpOptions, params: param });
  }

  getFilmById(id: number): Observable<Film> {
    return this.http.get<any>(this.urlMovie + id, { headers: httpOptions, params: param });
  }

  getCreditsByFilmId(id: number): Observable<any> {
    return this.http.get<any>(this.urlMovie + id + '/credits', { headers: httpOptions, params: param });
  }
  getCurrentFilm() {
    return this.currentFilm$.getValue();
  }

  setCurrentFilm(film: Film) {
    this.currentFilm$.next(film);
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_KEY } from '@core/constants/app.constant';
import { Film } from '@shared/models/film.model';
import { BehaviorSubject, Observable } from 'rxjs';

const httpOptions = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

@Injectable()
export class FilmsService {

  private urlSearch = 'https://api.themoviedb.org/3/search/movie';
  private urlMovie = 'https://api.themoviedb.org/3/movie/';

  public currentFilm$ = new BehaviorSubject<Film>(null);

  constructor(
    private http: HttpClient
  ) { }

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
}

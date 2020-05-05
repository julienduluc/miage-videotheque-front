import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '@shared/models/film.model';
import { BehaviorSubject } from 'rxjs';

const httpOptions = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
let param = new HttpParams().set('api_key', 'e6fa63e454efad680e9c890b9dc30a88');


@Injectable()
export class FilmsService {

  private url = 'https://api.themoviedb.org/3/search/movie';
  private apiKey = 'e6fa63e454efad680e9c890b9dc30a88';

  public currentFilm$ = new BehaviorSubject<Film>(null);

  constructor(
    private http: HttpClient
  ) { }

  getFilmsByName(name: string) {
    param = param.append('query', name);
    return this.http.get<any>(this.url, { headers: httpOptions, params: param });
  }

  getCurrentFilm() {
    return this.currentFilm$.getValue();
  }

  setCurrentFilm(film: Film) {
    this.currentFilm$.next(film);
  }


}

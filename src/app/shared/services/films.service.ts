import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '@shared/models/film.model';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

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
    return this.http.get<any>(this.urlMovie + id + '/credits');
  }

  getSimilarFilmsByFilmId(id: number): Observable<any> {
    return this.http.get<any>(this.urlMovie + id + '/similar');
  }

  getVideosByFilmId(id: number): Observable<any> {
    return this.http.get<any>(this.urlMovie + id + '/videos');
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
    const param = new HttpParams().append('query', name);
    return this.http.get<any>(this.urlSearch, { params: param });
  }


  /**
   * Film par id
   * @param id : id film
   */
  getFilmById(id: number): Observable<any> {
    return this.http.get<any>(this.urlMovie + id);
  }
}

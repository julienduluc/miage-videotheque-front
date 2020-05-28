import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '@shared/models/film.model';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class FilmsService {
  private api_key = 'e6fa63e454efad680e9c890b9dc30a88';
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
    const param = new HttpParams().append('query', name).append('language', 'fr-FR');
    return this.http.get<any>(this.urlSearch, { params: param });
  }

	/**
   * Film par id
   * @param id : id film
   */
  getFilmById(id: number): Observable<any> {
    const param = new HttpParams().append('language', 'fr-FR');
    return this.http.get<any>(this.urlMovie + id, { params: param });
  }

	/**
   * Ajout d'une note
   * @param idFilm : id film, noteFilm : note de film
   */

  addRate(idFilm: number, noteFilm: number): Observable<any> {
    const queryParams = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    const body = { value: noteFilm };
    return this.http.post(this.urlMovie + idFilm + '/rating', body, { params: queryParams });
  }

	/**
   * Supprime une note
   * @param idFilm : id film
   */
  deleteRate(idFilm: number): Observable<any> {
    const queryParams = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    return this.http.delete<any>(this.urlMovie + idFilm + '/rating', { params: queryParams });
  }

  getAccountState(idFilm: number): Observable<any> {
    const queryParams = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
    return this.http.get<any>(this.urlMovie + idFilm + '/account_states', { params: queryParams });
  }
}

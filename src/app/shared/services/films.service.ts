import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '@shared/models/film.model';
import { BehaviorSubject, of } from 'rxjs';

import { UtilsService } from './utils.service';

const films: Film[] = [
  { id: 1, name: 'Titanic' },
  { id: 2, name: 'Pulp Fiction' },
  { id: 3, name: 'Avatar' },
  { id: 4, name: 'Inception' },
  { id: 5, name: 'Fight club' },
];

@Injectable()
export class FilmsService {

  url: '';
  public currentFilm$ = new BehaviorSubject<Film>(null);

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  getFilmsByName(name: string) {
    // return this.http.get<Film[]>(this.url);
    return of(films);
  }

  getCurrentFilm() {
    return this.currentFilm$.getValue();
  }

  setCurrentFilm(film: Film) {
    const newFilm = films.find(x => x.id === film.id);
    this.currentFilm$.next(this.utilsService.copyObject(newFilm));
  }


}

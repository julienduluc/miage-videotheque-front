import { Component, OnDestroy, OnInit } from '@angular/core';
import { Film } from '@shared/models/film.model';
import { FilmsService } from '@shared/services/films.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'myapp-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  filmSelected: Film;

  constructor(
    private filmsService: FilmsService
  ) { }

  ngOnInit(): void {
    // Lors d'un changement de film
    this.filmsService.currentFilm$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (film) => {
        if (film) {
          this.filmSelected = film;
        }
      });

  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

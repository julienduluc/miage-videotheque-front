import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Film } from '@shared/models/film.model';
import { FilmsService } from '@shared/services/films.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'myapp-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();
  filmSelected: Film;
  id: number;
  director: Array<any>[];
  actors: Array<any>[];

  constructor(
    private filmsService: FilmsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    // Récupère l'id du film dans l'URL
    this.id = +this.route.snapshot.paramMap.get('id');

    // Détection : changement de film dans la barre de recherche
    this.filmsService.currentFilm$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (film) => {
        if (film) {
          this.filmSelected = film;
        }
      });

    // Récupère les infos du film sélectionné
    this.filmsService.getFilmById(this.id).subscribe((film) => {
      if (film) {
        this.filmSelected = film;
      }
    });

    // Récupère le réalisateur du film sélectionné
    this.filmsService.getCreditsByFilmId(this.id).subscribe((res) => {
      this.director = res.crew;
      this.actors = res.cast;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

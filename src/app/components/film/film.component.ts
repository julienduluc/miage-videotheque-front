import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Film } from '@shared/models/film.model';
import { Actor } from './../../shared/models/actor.model';
import { AccountService } from '@shared/services/account.service';
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
  id: number;
  director: Array<any>[];
  actors: Array<Actor>[];
  request_token: any;

  constructor(
    private filmsService: FilmsService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private authService: AuthService
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

  addToFavorite() {
    if (this.authService.isAuthenticated) {
      this.accountService.addFavorite(this.filmSelected.id).subscribe((res) => {
        if (res.status_code === 12) {
          console.log('ok');
        }
      });
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

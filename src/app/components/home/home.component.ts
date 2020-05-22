import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Film } from '@shared/models/film.model';
import { FilmsService } from '@shared/services/films.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HomeService } from './home.service';

interface Movie {
  id: number;
  rate: number;
  image_url: string;
  title: string;
  release_date: string;
  date_format: string;
}

@Component({
  selector: 'myapp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject();
  title: string;
  latest_movies: Movie[];
  top_rated_movies: Movie[];
  popular_movies: Movie[];
  upcoming_movies: Movie[];
  latest_movie: Movie;

  filmName: string;
  films: Film[];
  icon = 'pi pi-search';

  constructor(
    private authService: AuthService,
    private home_service: HomeService,
    private filmsService: FilmsService,
    private router: Router) { }

  load_latest_movies() {
    this.home_service.get_latest_movies('fr-FR').then((response) => {
      const results = response.data.results.slice(0, 10);
      this.latest_movies = results.map((movie) => {
        return {
          id: movie.id,
          rate: movie.vote_average,
          image_url: `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path
            ? movie.poster_path
            : movie.backdrop_path}`,
          title: movie.title,
          release_date: movie.release_date,
          date_format: 'longDate'
        };
      });
    });
  }

  load_top_rated_movies() {
    this.home_service.get_top_rated_movies('fr-FR').then((response) => {
      const results = response.data.results.slice(0, 10);
      this.top_rated_movies = results.map((movie) => {
        return {
          id: movie.id,
          rate: movie.vote_average,
          image_url: `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path
            ? movie.poster_path
            : movie.backdrop_path}`,
          title: movie.title,
          release_date: movie.release_date,
          date_format: 'yyyy'
        };
      });
    });
  }

  load_popular_movies() {
    this.home_service.get_popular_movies('fr-FR').then((response) => {
      const results = response.data.results.slice(0, 10);
      this.popular_movies = results.map((movie) => {
        return {
          id: movie.id,
          rate: movie.vote_average,
          image_url: `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path
            ? movie.poster_path
            : movie.backdrop_path}`,
          title: movie.title,
          release_date: movie.release_date,
          date_format: 'yyyy'
        };
      });
    });
  }

  load_upcoming_movies() {
    this.home_service.get_upcoming_movies('fr-FR').then((response) => {
      const results = response.data.results.slice(0, 10);
      this.upcoming_movies = results.map((movie) => {
        return {
          id: movie.id,
          rate: movie.vote_average,
          image_url: `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path
            ? movie.poster_path
            : movie.backdrop_path}`,
          title: movie.title,
          release_date: movie.release_date,
          date_format: 'yyyy'
        };
      });
    });
  }

  load_latest_movie() {
    this.home_service.get_latest_movie('fr-FR').then((response) => {
      const movie = response.data;
      this.latest_movie = {
        id: movie.id,
        rate: 0,
        image_url:
          movie.poster_path || movie.backdrop_path
            ? `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path
              ? movie.poster_path
              : movie.backdrop_path}`
            : 'https://www.arabtradeunion.org/images/def.png',
        title: movie.title,
        release_date: movie.release_date === '' ? new Date() : movie.release_date,
        date_format: 'longDate'
      };
    });
  }

  ngOnInit() {
    this.load_latest_movies();
    this.load_top_rated_movies();
    this.load_popular_movies();
    this.load_upcoming_movies();
    this.load_latest_movie();

    this.authService._isAuthenticated.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      if (res) {
        this.title = 'Connecté';
      } else {
        this.title = 'Non connecté';
      }
    });
  }

  /**
     * Peuple la liste déroulante en fonction de la recherche
     * @param event : event (liste déroulante)
     */
  search(event: any) {
    this.filmsService.getFilmsByName(event.query).subscribe(films => {
      this.films = [...films.results];
    });
  }

  /**
   * Agit lorsqu'un film est sélectionné
   * @param filmSelected : film sélectionné
   */
  onSelect(filmSelected: Film) {
    this.filmsService.setCurrentFilm(filmSelected);
    this.filmName = '';
    this.router.navigate(['film/' + filmSelected.id]);
  }

  onDropdownClick(event) {
    console.log('ici');
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

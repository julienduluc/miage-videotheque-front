import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilListsService } from '@components/profil/profil-lists/profil-lists.service';
import { AuthService } from '@core/auth/auth.service';
import { MessagesService } from '@core/messages/messages.service';
import { Actor } from '@shared/models/actor.model';
import { Film } from '@shared/models/film.model';
import { Video } from '@shared/models/video.model';
import { AccountService } from '@shared/services/account.service';
import { FilmsService } from '@shared/services/films.service';
import { ReviewService } from '@shared/services/review.service';
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
  director: Array<any>;
  actors: Array<Actor>;
  similarFilms: Array<Film>;
  keywords: Array<any>;
  safeUrl: SafeResourceUrl;
  request_token: any;
  note: number;
  reviews: Array<any>;

  isFavorite: boolean;
  isWatchlist: boolean;

  videos: Array<Video>;
  createdLists: Array<any>;
  displayLists = false;
  selectedCreatedLists = [];


  constructor(
    private filmsService: FilmsService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private msgService: MessagesService,
    private router: Router,
    private reviewService: ReviewService,
    private listsService: ProfilListsService
  ) { }

  ngOnInit(): void {

    // Récupère l'id du film dans l'URL
    this.id = +this.route.snapshot.paramMap.get('id');

    // Détection : changement de film dans la barre de recherche
    this.filmsService.currentFilm$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (film) => {
        if (film) {
          this.id = film.id;
          this.filmSelected = film;
          this.isFilmFavorite();
          this.getFilmsDetails();

        }
      });

    // Récupère les infos du film sélectionné
    this.filmsService.getFilmById(this.id).subscribe((film) => {
      if (film) {
        this.filmSelected = film;
        this.isFilmFavorite();
        this.note = Math.trunc(film.vote_average);
        this.getFilmsDetails();
      }
    });


  }

  getFilmsDetails() {
    // Récupère le réalisateur et les acteurs du film sélectionné
    this.filmsService.getCreditsByFilmId(this.id).subscribe((res) => {
      this.director = res.crew;
      this.actors = res.cast;
      this.actors = this.actors.slice(0, 7);
    });

    // Récupère les films similaires au film sélectionné
    this.filmsService.getSimilarFilmsByFilmId(this.id).subscribe((films) => {
      this.similarFilms = films.results;
    });


    this.filmsService.getVideosByFilmId(this.id).subscribe((res) => {
      this.videos = res.results;
      if (this.videos.length > 0) {
        this.videos.forEach(v => {
          v.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + v.key);
        });
      }
    });
    this.getReviews();
  }

  getReviews() {
    this.reviewService.getReviewsByFilm(this.id).subscribe((reviews) => {
      this.reviews = reviews;
      this.reviews.reverse();
    });
  }

  addToFavorite() {
    if (this.authService.isAuthenticated) {
      this.accountService.editFavorite(this.filmSelected.id, !this.isFavorite).subscribe((res) => {
        this.isFavorite = !this.isFavorite;

        const msg = this.isFavorite ? 'Film ajouté aux favoris' : 'Film retiré des favoris';
        this.msgService.showSuccess(msg);
      });
    }
  }

  getCreatedLists() {
    if (this.authService.isAuthenticated) {

      this.accountService.getCreatedLists().subscribe((lists) => {
        this.createdLists = lists.results;
        lists.results.forEach((list) => {
          this.listsService.isMovieInList(list.id, this.filmSelected.id + '').subscribe(res => {
            if (res.item_present) {
              list.item_present = true;
              this.selectedCreatedLists.push(list);
            }
          });
        });
        this.displayLists = true;
      });
    }
  }

  addToCreatedList() {
    if (this.authService.isAuthenticated) {
      this.selectedCreatedLists.forEach((selection) => {
        const body = { media_id: this.filmSelected.id };
        console.log('list', selection);
        if (selection.item_present) {
          this.listsService.removeMovie(selection.id, body).subscribe(() => this.msgService.showSuccess('Film supprimé de la liste'));
        } else {
          this.listsService.addMovie(selection.id, body).subscribe(() => this.msgService.showSuccess('Film ajouté à la liste'));
        }
      });
    }
  }

  addToWatchlist() {
    if (this.authService.isAuthenticated) {
      this.accountService.editWatchlist(this.filmSelected.id, !this.isFavorite).subscribe((res) => {
        this.isWatchlist = !this.isWatchlist;

        const msg = this.isWatchlist ? 'Film ajouté aux à la liste de suivi' : 'Film retiré de la liste de suivi';
        this.msgService.showSuccess(msg);
      });
    }
  }

  isFilmFavorite(): boolean {
    if (this.authService.isAuthenticated) {
      this.accountService.isFilmFavorite(this.filmSelected.id).subscribe((res) => {
        const isFav = res.length > 0 ? true : false;
        this.isFavorite = isFav;
        return isFav;
      });
    } else {
      this.isFavorite = false;
      return false;
    }
  }

  isWatchList(): boolean {
    if (this.authService.isAuthenticated) {
      this.accountService.isFilmWatchlist(this.filmSelected.id).subscribe((res) => {
        const isWatch = res.length > 0 ? true : false;
        this.isWatchlist = isWatch;
        return isWatch;
      });
    } else {
      this.isWatchlist = false;
      return false;
    }
  }

  goToFilm(film: any) {
    this.filmsService.setCurrentFilm(film);
    this.router.navigate(['film/' + film.id]);
  }


  goToProfilExt(id: number) {
    this.router.navigate(['profil/ext/' + id]);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { LanguageHelper } from '@core/language/language.helper';
import { LanguageService } from '@core/language/language.service';
import { Film } from '@shared/models/film.model';
import { FilmsService } from '@shared/services/films.service';
import { SessionStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';

@Component({
  selector: 'myapp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  languages: string[];
  filmName: string;
  films: Film[];

  private unsubscribe$ = new Subject();

  constructor(
    private languageHelper: LanguageHelper,
    private languageService: LanguageService,
    private filmsService: FilmsService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private sessionStorage: SessionStorageService,

  ) { }

  ngOnInit() {
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });

    this.route.queryParams.subscribe(param => {
      const par = param.request_token;
      this.authService.createSession(par);
    });

    /*this.authService._sessionId$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res) => {
        if (res) {

        }
      });*/

  }

  login(): void {
    this.authService.createRequestToken();
  }

  logout(): void {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
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

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

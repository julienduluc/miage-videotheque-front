import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@core/auth/auth.service';
import { Account } from '@shared/models/account.model';
import { Film } from '@shared/models/film.model';
import { AccountService } from '@shared/services/account.service';
import { FilmsService } from '@shared/services/films.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'myapp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  languages: string[];
  filmName: string;
  films: Film[];
  label: string;
  accountConnected: Account;

  private unsubscribe$ = new Subject();

  constructor(
    private filmsService: FilmsService,
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(param => {
      const par = param.request_token;
      this.authService.createSession(par);
    });

    this.authService._isAuthenticated.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (res) => {
        if (res) {
          this.accountService.getAccountDetails().subscribe((account) => {
            this.accountConnected = account;
            this.label = account.username[0].toUpperCase();
          });
        }
      });
  }

  login(): void {
    this.authService.createRequestToken();
  }

  logout(): void {
    this.authService.logout();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageHelper } from '@core/language/language.helper';
import { LanguageService } from '@core/language/language.service';
import { LoginService } from '@core/security/auth/login.service';
import { Film } from '@shared/models/film.model';
import { FilmsService } from '@shared/services/films.service';

@Component({
  selector: 'myapp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  languages: string[];
  filmName: string;
  films: Film[];

  constructor(
    private loginService: LoginService,
    private languageHelper: LanguageHelper,
    private languageService: LanguageService,
    private filmsService: FilmsService,
    private route: Router
  ) { }

  ngOnInit() {
    this.languageHelper.getAll().then(languages => {
      this.languages = languages;
    });

  }

  search(event: any) {
    this.filmsService.getFilmsByName(event.query).subscribe(films => {
      this.films = [...films.results];
    });
  }

  onSelect(filmSelected: any) {
    this.filmsService.setCurrentFilm(filmSelected);
    this.filmName = '';
    this.route.navigate(['film']);
  }

  isAuthenticated() {
    return this.loginService.isAuthenticated();
  }

  changeLanguage(languageKey: string) {
    this.languageService.changeLanguage(languageKey);
  }

  logout() {
    // this.loginService.logout();
  }


}

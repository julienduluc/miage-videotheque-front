import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FilmsService } from '@shared/services/films.service';

interface Movie {
  id: number;
  rate: number;
  image_url: string;
  title: string;
  release_date: string;
  date_format: string;
}

@Component({
  selector: 'myapp-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() movie: Movie;

  constructor(
    private router: Router,
    private filmsService: FilmsService
  ) { }

  ngOnInit(): void { }

  goToFilm(film: any) {
    this.filmsService.setCurrentFilm(film);
    this.router.navigate(['film/' + film.id]);
  }
}

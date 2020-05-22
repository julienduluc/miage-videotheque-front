import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void { }

  goToFilm(id: number) {
    this.router.navigate(['film/' + id]);
  }
}

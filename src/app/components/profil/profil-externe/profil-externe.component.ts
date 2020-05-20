import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '@shared/services/films.service';
import { ReviewService } from '@shared/services/review.service';

@Component({
  selector: 'myapp-profil-externe',
  templateUrl: './profil-externe.component.html',
  styleUrls: ['./profil-externe.component.scss']
})
export class ProfilExterneComponent implements OnInit {

  id: string;
  reviews: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private filmService: FilmsService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.getReviewsByUser(this.id).subscribe((reviews) => {
      this.reviews = reviews;
      console.log('reviews', reviews);

      this.reviews.forEach(review => {
        this.getFilm(review.id_film);
      });
    });
  }

  getFilm(idFilm: number): void {
    this.filmService.getFilmById(idFilm).subscribe((film) => {
      console.log('film', film);

    });
  }

}

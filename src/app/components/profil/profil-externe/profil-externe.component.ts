import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Film } from '@shared/models/film.model';
import { AccountService } from '@shared/services/account.service';
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
  lists: Array<any>;

  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private filmService: FilmsService,
    private accountService: AccountService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getReviews();
    this.getLists();
  }

  getReviews(): void {
    this.reviewService.getReviewsByUser(this.id).subscribe((reviews) => {
      this.reviews = reviews;

      this.reviews.forEach(review => {
        this.getFilm(review.id_film).then((res) => {
          review.details_film = res; console.log('details_film', review);
        });

      });
    });
  }

  async getFilm(idFilm: number): Promise<any> {
    const a = await this.filmService.getFilmById(idFilm).toPromise();
    const film = new Film(a);
    return film;
  }

  deleteReview(id: number) {
    this.reviewService.deleteReview(id).subscribe(() => {
      const a = this.reviews.findIndex(x => x.id === id);
      this.reviews.splice(a, 1);
    });
  }

  getLists(): void {
    this.accountService.getCreatedLists(this.id).subscribe((lists) => {
      this.lists = lists.results;
    });
  }

  goToFilm(id: number) {
    this.router.navigate(['film/' + id]);
  }
}

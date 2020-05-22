import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '@core/messages/messages.service';
import { Film } from '@shared/models/film.model';
import { AccountService } from '@shared/services/account.service';
import { FilmsService } from '@shared/services/films.service';
import { ReviewService } from '@shared/services/review.service';

import { ProfilService } from './profil.service';

@Component({
  selector: 'myapp-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, AfterViewInit {

  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  account: any;

  lists: any[];
  ratings: any[];
  watchlist: any[];
  favorites: any[];
  reviews: any[];

  constructor(
    private accountService: AccountService,
    private profilService: ProfilService,
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private mgService: MessagesService,
    private filmService: FilmsService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.profilService.activeTab = this.route.snapshot.data.tab;

    this.accountDetails();
    this.getAccountMultiples();
    this.getReviews();
  }

  ngAfterViewInit(): void {
    this.tabGroup.selectedIndex = this.profilService.activeTab;
  }

  selectedTabChange($event: any) {
    this.profilService.activeTab = $event.index;
    if (this.profilService.activeTab === 0) {
      this.getAccountMultiples();
    }
  }

  accountDetails(): void {
    this.accountService.getAccountDetails().subscribe((account) => {
      this.account = account;
    });
  }

  getAccountMultiples(): void {
    this.accountService.getAccountMultiples().subscribe((results) => {

      this.ratings = results[0].results;
      this.favorites = results[1].results;
      this.lists = results[2].results;
      this.watchlist = results[3].results;
    });
  }

  async getReviews() {
    const userConnected = await this.accountService.getAccountDetails().toPromise();
    this.reviewService.getReviewsByUser(userConnected.id).subscribe((reviews) => {
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
      this.mgService.showSuccess('Revue supprimée');
    });
  }

  goToFilm(id: number) {
    this.router.navigate(['film/' + id]);
  }

}

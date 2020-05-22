import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesService } from '@core/messages/messages.service';
import { AccountService } from '@shared/services/account.service';
import { FilmsService } from '@shared/services/films.service';

@Component({
  selector: 'myapp-profil-ratings',
  templateUrl: './profil-ratings.component.html',
  styleUrls: ['./profil-ratings.component.scss']
})
export class ProfilRatingsComponent implements OnInit, OnChanges {

  @Input() ratings: any[];
  selectedOrder = 'desc';

  constructor(
    private accountService: AccountService,
    private filmService: FilmsService,
    private router: Router,
    private msgService: MessagesService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(): void { }

  onChange(order: string): void {
    this.selectedOrder = order;
    this.accountService.getAccountRatings(this.selectedOrder).subscribe(res => {
      this.ratings = res.results;
    });
  }

  deleteRate(id: number): void {
    this.filmService.deleteRate(id).subscribe((res) => {
      const a = this.ratings.findIndex(x => x.id === id);
      this.ratings.splice(a, 1);
      this.msgService.showSuccess('Note supprimée');
    });
  }

  goToFilm(id: number) {
    this.router.navigate(['film/' + id]);
  }


}

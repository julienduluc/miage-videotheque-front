import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@shared/services/account.service';

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
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngOnChanges(): void { }

  onChange(order: string): void {
    this.selectedOrder = order;
    this.accountService.getAccountRatings(this.selectedOrder).subscribe(res => {
      this.ratings = res.results;
    });
  }

  goToFilm(id: number) {
    this.router.navigate(['film/' + id]);
  }


}

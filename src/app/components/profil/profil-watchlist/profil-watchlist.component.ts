import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@shared/services/account.service';

@Component({
  selector: 'myapp-profil-watchlist',
  templateUrl: './profil-watchlist.component.html',
  styleUrls: ['./profil-watchlist.component.scss']
})
export class ProfilWatchlistComponent implements OnInit {

  @Input() watchlist: any[];

  selectedOrder = 'desc';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onChange(order: string): void {
    this.selectedOrder = order;
    this.accountService.getAccountWatchlist(this.selectedOrder).subscribe(res => {
      this.watchlist = res.results;
    });
  }

  editWatchlist(id: number): void {
    this.accountService.editWatchlist(id, false).subscribe((res) => {
      const a = this.watchlist.findIndex(x => x.id === id);
      this.watchlist.splice(a, 1);
    });
  }

  goToFilm(id: number) {
    this.router.navigate(['film/' + id]);
  }
}

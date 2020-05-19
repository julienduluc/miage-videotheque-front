import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '@shared/services/account.service';

@Component({
  selector: 'myapp-profil-favorite',
  templateUrl: './profil-favorite.component.html',
  styleUrls: ['./profil-favorite.component.scss']
})
export class ProfilFavoriteComponent implements OnInit {

  @Input() favorites: any[];
  selectedOrder = 'desc';

  constructor(
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  onChange(order: string): void {
    this.selectedOrder = order;
    this.accountService.getAccountFavorite(this.selectedOrder).subscribe(res => {
      this.favorites = res.results;
    });
  }

  goToFilm(id: number) {
    this.router.navigate(['film/' + id]);
  }

  editFavorite(id: number): void {
    this.accountService.editFavorite(id, false).subscribe((res) => {
      const a = this.favorites.findIndex(x => x.id === id);
      this.favorites.splice(a, 1);
    });
  }

}

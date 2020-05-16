import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from '@shared/services/account.service';

import { ProfilService } from './profil.service';

@Component({
  selector: 'myapp-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, AfterViewInit {

  @ViewChild('tabGroup') tabGroup: MatTabGroup;
  tabSelected: number;
  account: any;

  lists: any[];
  ratings: any[];
  watchlist: any[];
  favorites: any[];

  statistics: Map<string, number> = new Map();

  constructor(
    private accountService: AccountService,
    private profilService: ProfilService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.tabSelected = this.route.snapshot.data.tab;
    this.profilService.activeTab = this.tabSelected;

    this.accountDetails();
    this.getAccountListsAndRatingsAndWatchlist();
  }

  ngAfterViewInit(): void {
    this.tabGroup.selectedIndex = this.profilService.activeTab;
  }

  selectedTabChange($event: any) {
    this.profilService.activeTab = $event.index;
  }

  accountDetails(): void {
    this.accountService.getAccountDetails().subscribe((account) => {
      this.account = account;
    });
  }


  getAccountListsAndRatingsAndWatchlist(): void {
    this.accountService.getAccountListsAndRatingsAndWatchlist().subscribe((results) => {

      this.ratings = results[0].results;
      this.favorites = results[1].results;
      this.lists = results[2].results;
      this.watchlist = results[3].results;

      this.statistics.set('ratings', results[0].total_results);
      this.statistics.set('favorites', results[1].total_results);
      this.statistics.set('lists', results[2].total_results);
      this.statistics.set('watchlist', results[3].total_results);
    });
  }
}

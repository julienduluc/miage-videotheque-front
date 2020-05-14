import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'myapp-profil-watchlist',
  templateUrl: './profil-watchlist.component.html',
  styleUrls: ['./profil-watchlist.component.scss']
})
export class ProfilWatchlistComponent implements OnInit {

  @Input() watchlist: any[];

  constructor() { }

  ngOnInit(): void { }


}

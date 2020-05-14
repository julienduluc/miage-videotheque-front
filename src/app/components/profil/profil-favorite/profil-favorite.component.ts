import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'myapp-profil-favorite',
  templateUrl: './profil-favorite.component.html',
  styles: []
})
export class ProfilFavoriteComponent implements OnInit {

  @Input() favorites: any[];

  constructor() { }

  ngOnInit(): void { }

}

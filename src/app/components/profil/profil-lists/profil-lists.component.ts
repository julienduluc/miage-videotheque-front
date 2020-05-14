import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'myapp-profil-lists',
  templateUrl: './profil-lists.component.html',
  styleUrls: ['./profil-lists.component.scss']
})
export class ProfilListsComponent implements OnInit {

  @Input() lists: any[];

  constructor() { }

  ngOnInit(): void { }



}

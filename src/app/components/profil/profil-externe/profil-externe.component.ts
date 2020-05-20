import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'myapp-profil-externe',
  templateUrl: './profil-externe.component.html',
  styleUrls: ['./profil-externe.component.scss']
})
export class ProfilExterneComponent implements OnInit {

  id: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

  }

}

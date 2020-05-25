import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProfilListsService } from '../profil-lists.service';

@Component({
  selector: 'myapp-profi-lists-details',
  templateUrl: './profi-lists-details.component.html',
  styleUrls: ['./profi-lists-details.component.scss']
})
export class ProfiListsDetailsComponent implements OnInit {

  id: number;
  list: any;

  constructor(
    private route: ActivatedRoute,
    private listService: ProfilListsService
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.list = this.listService.getListbyId(this.id).subscribe((list) => {
      this.list = list;
    });
  }

}

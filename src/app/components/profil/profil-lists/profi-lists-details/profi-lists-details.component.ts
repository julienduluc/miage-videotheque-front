import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '@core/messages/messages.service';

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
    private listService: ProfilListsService,
    private router: Router,
    private msgService: MessagesService
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.list = this.listService.getListbyId(this.id).subscribe((list) => {
      this.list = list;
      console.log('res', list);
    });
  }
  removeItem(id: number) {
    const body = { media_id: id };
    this.listService.removeMovie(this.id, body).subscribe(() => {
      const a = this.list.items.findIndex(x => x.id === id);
      this.list.items.splice(a, 1);
      this.msgService.showSuccess('Film retiré de la liste');
    });
  }

  clearList() {
    this.listService.clearList(this.id).subscribe(() => {
      this.list.items = [];
      this.msgService.showSuccess('Liste vidée');
    });
  }

  deleteList() {
    this.listService.deleteList(this.id).subscribe(() => {
      // BUG API
    }, (err) => {
      this.msgService.showSuccess('Liste supprimée');
      this.router.navigate(['profil/lists']);
    });
  }

  goToFilm(id: number) {
    this.router.navigate(['film/' + id]);
  }


}

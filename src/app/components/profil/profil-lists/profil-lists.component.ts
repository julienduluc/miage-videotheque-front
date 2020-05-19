import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '@shared/services/account.service';

import { ProfilListsService } from './profil-lists.service';

@Component({
  selector: 'myapp-profil-lists',
  templateUrl: './profil-lists.component.html',
  styleUrls: ['./profil-lists.component.scss']
})
export class ProfilListsComponent implements OnInit {

  @Input() lists: any[];

  selectedOrder = 'desc';

  displayModal = false;

  constructor(
    private accountService: AccountService,
    private listsService: ProfilListsService
  ) { }

  ngOnInit(): void { }

  getLists(): void {
    this.accountService.getAccountLists(this.selectedOrder).subscribe(res => {
      this.lists = res.results;
    });
  }

  onChange(order: string): void {
    this.selectedOrder = order;
    this.getLists();
  }

  openModal(): void {
    this.displayModal = true;
  }

  closeModal(form: any) {

    if (form) {
      this.listsService.createList(form.value).subscribe(() => {
        this.getLists();
        this.lists = [...this.lists];
      });
    }
    this.displayModal = false;
  }

  deleteList(idList: any) {

    this.listsService.deleteList(idList).subscribe(() => {
      // ANO API
    }, (err) => {
      const a = this.lists.findIndex(x => x.id === idList);
      this.lists.splice(a, 1);
      this.lists = [...this.lists];
    });
  }
}

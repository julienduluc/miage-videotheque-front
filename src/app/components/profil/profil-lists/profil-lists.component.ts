import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from '@shared/services/account.service';

@Component({
  selector: 'myapp-profil-lists',
  templateUrl: './profil-lists.component.html',
  styleUrls: ['./profil-lists.component.scss']
})
export class ProfilListsComponent implements OnInit {

  @Input() lists: any[];

  selectedOrder = 'desc';

  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void { }

  onChange(order: string): void {
    this.selectedOrder = order;
    this.accountService.getAccountLists(this.selectedOrder).subscribe(res => {
      this.lists = res.results;
    });
  }

}

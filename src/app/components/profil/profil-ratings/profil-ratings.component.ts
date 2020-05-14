import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { AccountService } from '@shared/services/account.service';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'myapp-profil-ratings',
  templateUrl: './profil-ratings.component.html',
  styleUrls: ['./profil-ratings.component.scss']
})
export class ProfilRatingsComponent implements OnInit, OnChanges {

  @Input() ratings: any[];

  displayDialog: boolean;

  sortOptions: SelectItem[];

  sortKey: string;

  sortField: string;

  sortOrder: number;

  descOrder = false;
  optionsOrder = [{ label: 'Croissant', value: 'asc' }, { label: 'Décroissant', value: 'desc' }];


  constructor(
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Date de notation', value: '!year' },
      { label: 'Note', value: 'year' }
    ];
  }

  ngOnChanges(): void { }

  onChange(event: any): void {
    this.descOrder = !this.descOrder;

    this.accountService.getAccountRatings(this.descOrder).subscribe(res => {
      this.ratings = res.results;
    });
  }


}

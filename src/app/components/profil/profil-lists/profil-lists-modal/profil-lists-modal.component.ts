import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'myapp-profil-lists-modal',
  templateUrl: './profil-lists-modal.component.html',
  styleUrls: ['./profil-lists-modal.component.scss']
})
export class ProfilListsModalComponent implements OnInit {

  @ViewChild('dd') dd: any;
  hideModal = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void { }

  onHide(event: any): void {
    console.log('chech'); console.log('dd', this.dd);
    this.hideModal.emit();
  }
}

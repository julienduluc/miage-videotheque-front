import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'myapp-profil-lists-modal',
  templateUrl: './profil-lists-modal.component.html',
  styleUrls: ['./profil-lists-modal.component.scss']
})
export class ProfilListsModalComponent implements OnInit {

  @Output() hideModal = new EventEmitter<any>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }



  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: ['']
    });
  }

  onHide(event): void {
    this.hideModal.emit();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.hideModal.emit(this.form);
    }
  }
}

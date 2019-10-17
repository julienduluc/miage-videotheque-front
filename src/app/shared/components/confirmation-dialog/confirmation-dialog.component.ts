import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'myapp-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  title: string;
  body: string;
  body1: string;

  @Output() validate = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.title = this.data.title;
    this.body = this.data.body;
    this.body1 = this.data.body1;
  }

  onClickValidate() {
    this.validate.emit();
    this.dialogRef.close(true);
  }

  onClickCancel() {
    this.cancel.emit();
    this.dialogRef.close(false);
  }
}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'myapp-select-dialog',
  templateUrl: './select-dialog.component.html',
  styleUrls: ['./select-dialog.component.scss']
})
export class SelectDialogComponent implements OnInit {

  labelVar: string;
  entries: Array<any>;
  optional: boolean;

  constructor(public dialogRef: MatDialogRef<SelectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.entries = this.data.entries;
    this.labelVar = this.data.labelVar;
    this.optional = this.data.optional;
  }

  onClickEntry(entry: any) {
    this.dialogRef.close(entry);
  }
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ImportService } from './import.service';

@Component({
  selector: 'myapp-import',
  templateUrl: 'import.component.html',
  styleUrls: ['./import.component.scss']
})
export class ImportComponent implements OnInit {

  @Input() url: string;
  @Input() typesFileAccepted: string;

  @Output() importSuccess = new EventEmitter();

  selectedFiles: Array<File>;

  constructor(
    private importService: ImportService
  ) { }

  ngOnInit() { }

  getFile(event) {
    if (event.target.files && event.target.files.length) {
      this.selectedFiles = event.target.files;
    }
  }

  importFile() {
    const file = this.selectedFiles;

    if (file && file.length > 0) {
      this.importService.importFile(this.selectedFiles[0], this.url)
        .subscribe(
          (res) => {
            this.importSuccess.emit(res);
          }
        );
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'df-import',
  templateUrl: 'import.component.html',
})
export class ImportComponent implements OnInit {

  typeFileAccepted: '.csv';

  selectedFiles: Array<File>;

  constructor() { }

  ngOnInit() { }

  getFile(event) {
    if (event.target.files && event.target.files.length) {
      this.selectedFiles = event.target.files;
    }
  }

  importFile() {
    /*const file = this.selectedFiles;

    if (file && file.length > 0) {
      this.sasImportService.importer(this.selectedFiles[0], null, null, null, null)
        .pipe(first()).subscribe(
          (result) => {
            this.isLoading = false;
          },
          (err) => {
            this.isLoading = false;
          }
        );
    }*/
  }

  /*importer(file: File): Observable<any> {
    let url = '';

    const formData: FormData = new FormData();
    formData.append('fichier', file, file.name);

    return this.http.post<any>(url, formData);
  }*/
}

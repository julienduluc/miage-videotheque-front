import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACK_FILE_IMPORT_ATTRIBUTE } from '@core/constants/app.constant';
import { Observable } from 'rxjs';

@Injectable()
export class ImportService {

  constructor(
    private http: HttpClient
  ) { }

  importFile(file: File, url: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(BACK_FILE_IMPORT_ATTRIBUTE, file, file.name);

    return this.http.post<any>(url, formData);
  }
}

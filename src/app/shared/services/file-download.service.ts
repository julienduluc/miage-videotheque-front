import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BACK_ERROR_MESSAGE_ATTRIBUT } from '@core/constants/app.constant';
import { ErrorService } from '@core/errors/error.service';
import { MessagesService } from '@core/messages/messages.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';

@Injectable()
export class FileDownloadService {

  constructor(
    private http: HttpClient,
    private messageService: MessagesService,
    private errorService: ErrorService
  ) { }

  /**
   * Saves a file by opening file-save-as dialog in the browser
   * using file-save library.
   * @param blobContent file content as a Blob
   * @param fileName name file should be saved as
   */
  private static saveFile(blobContent: Blob, fileName: string) {
    const blob = new Blob([blobContent], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
  }

  /**
   * Derives file name from the http response
   * by looking inside content-disposition
   * @param res http Response
   */
  private static getFileNameFromResponseContentDisposition(res: HttpResponse<any>) {
    const contentDisposition = res.headers.get('content-disposition') || '';
    const matches = /filename=([^;]+)/ig.exec(contentDisposition);
    return (matches[1] || 'untitled').trim();
  }

  downloadFileGet(fileUrl: string, message?: string, filename?: string) {
    this.http.get(fileUrl, { observe: 'response', responseType: 'blob' })
      .pipe(catchError((error) => this.parseErrorBlob(error))).pipe(first()).subscribe(
        (response) => {
          let filenameToDownload = '';

          if (filename) {
            filenameToDownload = filename;
          } else {
            filenameToDownload = FileDownloadService.getFileNameFromResponseContentDisposition(response);
          }

          FileDownloadService.saveFile(response.body, filenameToDownload);

          if (message) {
            this.messageService.showSuccess(message);
          }
        });
  }

  downloadFilePost(fileUrl: string, body: any, message?: string, filename?: string) {
    this.http.post(fileUrl, body, { observe: 'response', responseType: 'blob' })
      .pipe(catchError((error) => this.parseErrorBlob(error))).pipe(first()).subscribe(
        (response) => {
          let filenameToDownload = '';

          if (filename) {
            filenameToDownload = filename;
          } else {
            filenameToDownload = FileDownloadService.getFileNameFromResponseContentDisposition(response);
          }

          FileDownloadService.saveFile(response.body, filenameToDownload);

          if (message) {
            this.messageService.showSuccess(message);
          }
        });
  }

  parseErrorBlob(err: HttpErrorResponse): Observable<any> {
    const reader: FileReader = new FileReader();
    // Observable.create before v
    const obs = new Observable((observer: any) => {
      reader.onloadend = (e) => {
        observer.error(JSON.parse(reader.result + ''));
        observer.complete();

        const error = JSON.parse(reader.result + '');

        if (error && this.errorService.isErrorToDisplay(error[BACK_ERROR_MESSAGE_ATTRIBUT])) {
          this.messageService.showErrorNoTranslate(error.message);
        }
      };
    });
    reader.readAsText(err.error);

    return obs;
  }
}

import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';
import { catchError, first } from 'rxjs/operators';
import { MessagesService } from 'src/app/core/messages/messages.service';

@Injectable()
export class FileDownloadService {

  constructor(private http: HttpClient, private messageService: MessagesService) { }

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

  downloadFileGet(fileUrl: string, message?: string) {
    this.http.get(fileUrl, { observe: 'response', responseType: 'blob' })
      .pipe(catchError((error) => this.parseErrorBlob(error))).pipe(first()).subscribe(
        (response) => {
          FileDownloadService.saveFile(response.body, FileDownloadService.getFileNameFromResponseContentDisposition(response));

          if (message) {
            this.messageService.showSuccess(message);
          }
        });
  }

  downloadFilePost(fileUrl: string, body: any, message?: string) {
    this.http.post(fileUrl, body, { observe: 'response', responseType: 'blob' })
      .pipe(catchError((error) => this.parseErrorBlob(error))).pipe(first()).subscribe(
        (response) => {
          FileDownloadService.saveFile(response.body, FileDownloadService.getFileNameFromResponseContentDisposition(response));

          if (message) {
            this.messageService.showSuccess(message);
          }
        });
  }

  parseErrorBlob(err: HttpErrorResponse): Observable<any> {
    const reader: FileReader = new FileReader();
    const obs = Observable.create((observer: any) => {
      reader.onloadend = (e) => {
        observer.error(JSON.parse(reader.result + ''));
        observer.complete();

        const error = JSON.parse(reader.result + '');

        if (error.message
          && (!error.message.toLowerCase().includes('failed')
            && !error.message.toLowerCase().includes('error')
            && !error.message.toLowerCase().includes('exception')
            && !error.message.toLowerCase().includes('java')
            && !error.message.toLowerCase().includes('required')
            && !error.message.toLowerCase().includes('spring'))) {
          this.messageService.showErrorNoTranslate(error.message);
        }
      };
    });
    reader.readAsText(err.error);

    return obs;
  }
}

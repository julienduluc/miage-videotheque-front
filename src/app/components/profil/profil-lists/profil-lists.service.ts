import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/app.constant';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable()
export class ProfilListsService {

  url = 'list';
  queryParams: any;


  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {
    this.queryParams = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
  }

  createList(body: any): Observable<any> {
    return this.http.post<any>(API + this.url, body, { params: this.queryParams });
  }

  clearList(idList: number, body: any) {
    return this.http.post<any>(API + this.url + '/' + idList + '/clear', body, { params: this.queryParams });
  }

  deleteList(idList: number) {
    return this.http.delete<any>(API + this.url + '/' + idList, { params: this.queryParams });
  }

  addMovie(idList: number, body: any) {
    return this.http.post<any>(API + this.url + '/' + idList + '/add_item', body, { params: this.queryParams });
  }

  removeMovie(idList: number, body: any) {
    return this.http.post<any>(API + this.url + '/' + idList + '/remove_item', body, { params: this.queryParams });
  }
}

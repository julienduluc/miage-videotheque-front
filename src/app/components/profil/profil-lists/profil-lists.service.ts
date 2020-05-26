import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/app.constant';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable()
export class ProfilListsService {


  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {
    this.queryParams = new HttpParams().append('session_id', this.sessionStorage.retrieve('sessionId'));
  }

  url = 'list';
  queryParams: any;

  check;

  createList(body: any): Observable<any> {
    return this.http.post<any>(API + this.url, body, { params: this.queryParams });
  }

  clearList(idList: number) {
    this.queryParams = this.queryParams.append('confirm', 'true');
    return this.http.post<any>(API + this.url + '/' + idList + '/clear', null, { params: this.queryParams });
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

  isMovieInList(idList: number, idMovie: string) {
    const queryParams = new HttpParams().append('movie_id', idMovie);
    return this.http.get<any>(API + this.url + '/' + idList + '/item_status', { params: queryParams });
  }

  getListbyId(idList: number) {
    return this.http.get<any>(API + this.url + '/' + idList);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { SERVER_API } from './../../constants/server-api.constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfos() {
    return this.http.get<any>(SERVER_API + '/account/', httpOptions);
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_API, SERVER_USER_INFOS_ROUTE } from '@core/constants/app.constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class UserService {

  constructor(private http: HttpClient) { }

  getUserInfos() {
    return this.http.get<any>(SERVER_API + '/' + SERVER_USER_INFOS_ROUTE + '/', httpOptions);
  }
}

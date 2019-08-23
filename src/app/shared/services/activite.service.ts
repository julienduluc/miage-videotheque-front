import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ActiviteService {

  private baseUrl = '/api/activites';

  constructor(
    private http: HttpClient,
  ) { }

  /* ============   GET   ========= */
  getActivitesRecherche(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/rechercher', body, httpOptions);
    // return this.http.post<any>(this.baseUrlCommentaire, body, { observe: 'response' });
  }
  updateActivite(id: number, body: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + '/' + id, body, httpOptions);
  }

  dupliqueActivites(body: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/dupliquer', body, httpOptions);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable()
export class ReviewService {


  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }


  addReview(review: any): Observable<any> {
    return this.http.post<any>('api/review/add', JSON.stringify(review));
  }

  getReviewsByUser(idUser: string): Observable<any> {
    return this.http.get<any>('api/reviews/user/' + idUser);
  }

  getReviewsByFilm(idFilm: number): Observable<any> {
    return this.http.get<any>('api/reviews/film/' + idFilm);
  }


}

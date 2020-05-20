import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ReviewService {


  constructor(
    private http: HttpClient
  ) { }


  addReview(review: any): Observable<any> {
    return this.http.post<any>('api/review/add', review);
  }

  // TO DO
  getReviewsByUser(): Observable<any> {
    return this.http.get<any>('api/reviews');
  }

  // TO DO
  getReviewsByFilm(): Observable<any> {
    return this.http.get<any>('api/reviews');
  }


}

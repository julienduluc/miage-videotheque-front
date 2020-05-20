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

  getReviewsByUser(idUser: string): Observable<any> {
    return this.http.get<any>('api/reviews/user/' + idUser);
  }

  getReviewsByFilm(idFilm: number): Observable<any> {
    return this.http.get<any>('api/reviews/film/' + idFilm);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete<any>('api/review/delete/' + id);
  }
}

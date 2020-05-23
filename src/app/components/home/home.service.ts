import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/app.constant';
import axios from 'axios';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HomeService {
  private api_key = '317bd54d9bb697972374f35d83998691';

  constructor(private http: HttpClient) { }

  get_latest_movies(language: string = ' ') {
    return axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${this.api_key}&${language === ' '
        ? '' : `language=${language}`}`
    );
  }

  get_top_rated_movies(language: string = ' ') {
    return axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.api_key}&${language === ' '
        ? ''
        : `language=${language}`}`
    );
  }

  get_latest_movie(language: string = ' ') {
    return axios.get(
      `https://api.themoviedb.org/3/movie/latest?api_key=${this.api_key}&${language === ' '
        ? ''
        : `language=${language}`}`
    );
  }

  get_popular_movies(language: string = ' ') {
    return axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.api_key}&${language === ' '
        ? ''
        : `language=${language}`}`
    );
  }

  get_upcoming_movies(language: string = ' ') {
    return axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${this.api_key}&${language === ' '
        ? ''
        : `language=${language}`}`
    );
  }

  getDayTrending(): Observable<any> {
    return this.http.get<any>(API + 'trending/movie/day');
  }

  getMostRated(): Observable<any> {
    const queryParam = new HttpParams().append('sort_by', 'vote_count.desc');
    return this.http.get<any>(API + 'discover/movie', { params: queryParam });
  }

  getTrailerByFilmId(id: number): Observable<any> {
    return this.http.get<any>(API + 'movie/' + id + '/videos').pipe(map(
      (x) => x.results.filter((y: any) => (y.type === 'Trailer'))
    ));
  }
}

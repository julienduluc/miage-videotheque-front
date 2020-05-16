import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

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

  get_recommendations() { }
}

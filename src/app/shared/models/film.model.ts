export class Film {

  poster_path: string;
  adult: boolean;
  overview: number;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;

  constructor(obj?: Film) {
    if (obj) {
      this.poster_path = obj.poster_path;
      this.adult = obj.adult;
      this.overview = obj.overview;
      this.release_date = obj.release_date;
      this.genre_ids = obj.genre_ids;
      this.id = obj.id;
      this.original_title = obj.original_title;
      this.original_language = obj.original_language;
      this.title = obj.title;
      this.backdrop_path = obj.backdrop_path;
      this.popularity = obj.popularity;
      this.vote_count = obj.vote_count;
      this.video = obj.video;
      this.vote_average = obj.vote_average;
    }
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HomeService } from './home.service';

interface Movie {
	rate: number;
	image_url: string;
	title: string;
	release_date: string;
}

@Component({
	selector: 'myapp-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit, OnDestroy {
	private unsubscribe$ = new Subject();
	title: string;
	latest_movies: Movie[];
	top_rated_movies: Movie[];

	constructor(private authService: AuthService, private home_service: HomeService) {}

	load_latest_movies() {
		this.home_service.get_latest_movies('en-US').then((response) => {
			const results = response.data.results.slice(0, 12);
			this.latest_movies = results.map((movie) => {
				return {
					rate: movie.vote_average,
					image_url: `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path
						? movie.poster_path
						: movie.backdrop_path}`,
					title: movie.title,
					release_date: movie.release_date
				};
			});
		});
	}

	load_top_rated_movies() {
		this.home_service.get_top_rated_movies('en-US').then((response) => {
			const results = response.data.results.slice(0, 12);
			this.top_rated_movies = results.map((movie) => {
				return {
					rate: movie.vote_average,
					image_url: `https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path
						? movie.poster_path
						: movie.backdrop_path}`,
					title: movie.title,
					release_date: movie.release_date
				};
			});
		});
	}

	ngOnInit() {
		this.load_latest_movies();
		this.load_top_rated_movies();

		this.authService._isAuthenticated.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
			if (res) {
				this.title = 'Connecté';
			} else {
				this.title = 'Non connecté';
			}
		});
	}

	ngOnDestroy() {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}
}

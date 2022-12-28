import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, of, switchMap } from 'rxjs';
import { Movie, MovieDto, MovieVideoDto } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '50debaf3ba8d352eae5f40c46fff46f2';

  constructor(private http: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${type}?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getMovie(movieId: string) {
    return this.http.get<Movie>(`${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`);
  }

  searchMovies(page: number) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/upcoming?page=${page}&api_key=${this.apiKey}`);
  }

  getVideos(movieId: string) {
    return this.http.get<MovieVideoDto>(`${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }
}

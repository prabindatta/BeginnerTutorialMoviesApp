import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { count, of, switchMap } from 'rxjs';
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { GenresDto } from '../models/genre';

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

  searchMovies(page: number, query?: string) {
    const uri = query ? `/search/movie` : '/movie/upcoming';
    return this.http.get<MovieDto>(`${this.baseUrl}${uri}?query=${query}&page=${page}&api_key=${this.apiKey}`);
  }

  getVideos(movieId: string) {
    return this.http.get<MovieVideoDto>(`${this.baseUrl}/movie/${movieId}/videos?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results);
      })
    );
  }

  getPosters(movieId: string) {
    return this.http.get<MovieImages>(`${this.baseUrl}/movie/${movieId}/images?api_key=${this.apiKey}`);
  }

  getCredits(movieId: string) {
    return this.http.get<MovieCredits>(`${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`);
  }

  getSimilar(movieId: string, count: number = 12) {
    return this.http.get<MovieDto>(`${this.baseUrl}/movie/${movieId}/similar?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }

  getGenres(type: string) {
    return this.http.get<GenresDto>(`${this.baseUrl}/genre/${type}/list?api_key=${this.apiKey}`).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }

  getMoviesByGenre(genreId: string, page: number) {
    return this.http.get<MovieDto>(
      `${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TvShowDto } from '../models/tv';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {
  baseUrl: string = 'https://api.themoviedb.org/3';
  apiKey: string = '50debaf3ba8d352eae5f40c46fff46f2';

  constructor(private http: HttpClient) {}

  searchTvShows(page: number, query?: string) {
    const uri = query ? `/search/tv` : '/tv/popular';
    return this.http.get<TvShowDto>(`${this.baseUrl}${uri}?query=${query}&page=${page}&api_key=${this.apiKey}`);
  }

  getTvShowsByGenre(genreId: string, page: number) {
    return this.http.get<TvShowDto>(
      `${this.baseUrl}/discover/movie?with_genres=${genreId}&page=${page}&api_key=${this.apiKey}`
    );
  }
}

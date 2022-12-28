import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/components/item/item';
import { mapMovieToItem, Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  upcomingMovies: Item[] = [];
  nowPlayingMovies: Item[] = [];
  popularMovies: Item[] = [];
  topRatedMovies: Item[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getUpcomingMovies();
    this.getNowPlayingMovies();
    this.getPopularMovies();
    this.getTopRatedMovies();
  }

  getUpcomingMovies() {
    this.moviesService.getMovies().subscribe((response) => {
      this.upcomingMovies = response.map((movie) => mapMovieToItem(movie));
    });
  }

  getNowPlayingMovies() {
    this.moviesService.getMovies('now_playing', 6).subscribe((response) => {
      this.nowPlayingMovies = response.map((movie) => mapMovieToItem(movie));
    });
  }

  getPopularMovies() {
    this.moviesService.getMovies('popular', 6).subscribe((response) => {
      this.popularMovies = response.map((movie) => mapMovieToItem(movie));
    });
  }

  getTopRatedMovies() {
    this.moviesService.getMovies('top_rated', 6).subscribe((response) => {
      this.topRatedMovies = response.map((movie) => mapMovieToItem(movie));
    });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from '../../constants/images-sizes';
import { Movie, MovieCredits, MovieImages, MovieVideo } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';
import ISO6391 from 'iso-639-1';
import { NgClass } from '@angular/common';
import { take } from 'rxjs';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  item: Movie | null = null;
  itemVideos: MovieVideo[] = [];
  itemImages: MovieImages | null = null;
  itemCredits: MovieCredits | null = null;
  itemSimilarMovies: Movie[] = [];
  imagesSizes = IMAGES_SIZES;
  iso6391 = ISO6391;

  constructor(private route: ActivatedRoute, private movieService: MoviesService) {}
  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ id }) => {
      this.getMovieInfo(id);
      this.getMovieVideos(id);
      this.getMoviePosters(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    });
  }

  ngOnDestroy(): void {
    console.log('MovieDetailsComponent Destroyed');
  }

  getMovieInfo(movieId: string) {
    this.movieService.getMovie(movieId).subscribe((response) => {
      this.item = response;
    });
  }

  getMovieVideos(movieId: string) {
    this.movieService.getVideos(movieId).subscribe((response) => {
      this.itemVideos = response;
    });
  }

  getMoviePosters(movieId: string) {
    this.movieService.getPosters(movieId).subscribe((response) => {
      this.itemImages = response;
    });
  }

  getMovieCredits(movieId: string) {
    this.movieService.getCredits(movieId).subscribe((response) => {
      this.itemCredits = response;
    });
  }

  getSimilarMovies(movieId: string) {
    this.movieService.getSimilar(movieId, 4).subscribe((response) => {
      this.itemSimilarMovies = response;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGES_SIZES } from 'src/app/constants/images-sizes';
import { Movie, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  item: Movie | null = null;
  itemVideos: MovieVideo[] = [];
  imagesSizes = IMAGES_SIZES;

  constructor(private route: ActivatedRoute, private movieService: MoviesService) {}
  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
    });
  }

  getMovie(movieId: string) {
    this.movieService.getMovie(movieId).subscribe((response) => {
      this.item = response;
    });
  }

  getMovieVideos(movieId: string) {
    this.movieService.getVideos(movieId).subscribe((response) => {
      this.itemVideos = response;
    });
  }
}

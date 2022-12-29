import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genre';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  movieGenres: Genre[] = [];
  tvGenres: Genre[] = [];
  constructor(private movieService: MoviesService) {}
  ngOnInit(): void {
    this.getMoviesGenres();
    this.getTVGenres();
  }

  getMoviesGenres() {
    this.movieService.getGenres('movie').subscribe((response) => {
      this.movieGenres = response;
    });
  }

  getTVGenres() {
    this.movieService.getGenres('tv').subscribe((response) => {
      this.tvGenres = response;
    });
  }
}

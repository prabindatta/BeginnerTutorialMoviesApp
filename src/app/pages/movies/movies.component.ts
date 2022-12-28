import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/components/item/item';
import { mapMovieToItem, Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  @Input() items: Item[] = [];

  totalPages: number = 0;

  constructor(private movieService: MoviesService) {}
  ngOnInit(): void {
    this.getPagedMovies(1);
  }

  getPagedMovies(page: number) {
    this.movieService.searchMovies(page).subscribe((response) => {
      this.items = response.results.map((movie) => mapMovieToItem(movie));
      this.totalPages = response.total_results;
    });
  }

  paginate(event: any) {
    this.getPagedMovies(event + 1);
  }
}

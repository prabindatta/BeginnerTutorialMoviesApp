import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Item } from 'src/app/components/item/item';
import { mapMovieToItem } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  @Input() items: Item[] = [];

  genreId: string | null = null;
  totalPages: number = 0;
  searchValue: string | null = null;

  constructor(private movieService: MoviesService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.searchMovieWithData(1);
      }
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else if (this.searchValue) {
      this.searchMovieWithData(pageNumber, this.searchValue);
    } else {
      this.searchMovieWithData(pageNumber);
    }
  }

  getMoviesByGenre(genreId: string, page: number) {
    this.movieService.getMoviesByGenre(genreId, page).subscribe((response) => {
      this.items = response.results.map((movie) => mapMovieToItem(movie));
      this.totalPages = response.total_results;
    });
  }

  searchMovie() {
    if (this.searchValue) {
      this.searchMovieWithData(1, this.searchValue);
    }
  }

  searchMovieWithData(page: number, search?: string) {
    this.movieService.searchMovies(page, search).subscribe((response) => {
      this.items = response.results.map((movie) => mapMovieToItem(movie));
      this.totalPages = response.total_results;
      console.log(this.items.length);
      console.log(this.totalPages);
    });
  }
}

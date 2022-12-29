import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Item } from 'src/app/components/item/item';
import { mapTvShowToItem } from 'src/app/models/tv';
import { TvshowsService } from 'src/app/services/tvshows.service';

@Component({
  selector: 'app-tvshows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvshowsComponent implements OnInit {
  @Input() items: Item[] = [];

  genreId: string | null = null;
  totalPages: number = 0;
  searchValue: string | null = null;

  constructor(private movieService: TvshowsService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getTvShowsByGenre(genreId, 1);
      } else {
        this.searchTvShowWithData(1);
      }
    });
  }

  paginate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getTvShowsByGenre(this.genreId, pageNumber);
    } else if (this.searchValue) {
      this.searchTvShowWithData(pageNumber, this.searchValue);
    } else {
      this.searchTvShowWithData(pageNumber);
    }
  }

  getTvShowsByGenre(genreId: string, page: number) {
    this.movieService.getTvShowsByGenre(genreId, page).subscribe((response) => {
      this.items = response.results.map((tv) => mapTvShowToItem(tv));
      this.totalPages = response.total_results;
    });
  }

  searchTvShow() {
    if (this.searchValue) {
      this.searchTvShowWithData(1, this.searchValue);
    }
  }

  searchTvShowWithData(page: number, search?: string) {
    this.movieService.searchTvShows(page, search).subscribe((response) => {
      this.items = response.results.map((tv) => mapTvShowToItem(tv));
      this.totalPages = response.total_results;
      console.log(this.items.length);
      console.log(this.totalPages);
    });
  }
}

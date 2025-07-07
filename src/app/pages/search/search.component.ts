import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Movie, MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { MovieGridComponent } from '../../components/movie-grid/movie-grid.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { SuggestedComponent } from '../../components/suggested/suggested.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    MovieGridComponent,
    FooterComponent,
    SuggestedComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  searchedMovies: Movie[] = [];
  searchQuery: string = '';
  title: string = '';

  loading = false;
  error: string | null = null;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.searchedMovies = [];
    this.titleService.setTitle(`Movie Explorer - Tìm kiếm`);

    this.route.queryParams.subscribe((params) => {
      const query = params['q'];
      if (query) {
        this.searchQuery = query;
        this.title = `🔍 Kết quả tìm kiếm cho từ khóa "${query}"`;
        this.searchMoviesByKeyword(query);
      }
    });
  }

  searchMoviesByKeyword(query: string) {
    this.loading = true;
    this.error = null;
    this.searchedMovies = [];
    this.movieService
      .searchMovies({
        query,
        delayMs: 1000,
      })
      .subscribe({
        next: (movies) => {
          this.searchedMovies = movies.slice(0, 9);
          this.loading = false;
        },
        error: (error) => {
          this.error =
            error.message || 'An error occurred while searching for movies.';
          this.loading = false;
        },
      });
  }

  isTooManyResultsError(): boolean {
    if (!this.error) return false;
    
    const errorLower = this.error.toLowerCase();
    return errorLower.includes('too many results');
  }
}

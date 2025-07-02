import { Component } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar.component';
import { MovieListComponent } from '../../components/movie-list/movie-list.component';
import { MovieService, Movie } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SearchBarComponent, MovieListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchResults: Movie[] = [];
  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  onSearch(query: string) {
    if (!query.trim()) {
      this.error = 'Please enter a search term';
      return;
    }

    this.loading = true;
    this.error = null;
    this.searchResults = [];

    this.movieService.searchMovies(query).subscribe({
      next: (movies) => {
        this.searchResults = movies;
        this.loading = false;
        if (movies.length === 0) {
          this.error = 'No movies found for your search.';
        }
      },
      error: (error) => {
        this.error = error.message || 'An error occurred while searching for movies.';
        this.loading = false;
      }
    });
  }
}

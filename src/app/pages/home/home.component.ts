import { Component, OnInit } from '@angular/core';
import { MovieService, Movie } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { RecentlyReleasedComponent } from '../../components/recently-released/recently-released.component';
import { MovieSliderComponent } from '../../components/movie-slider/movie-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RecentlyReleasedComponent,
    MovieSliderComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  searchResults: Movie[] = [];
  featuredMovies: Movie[] = [];
  recentlyReleasedMovies: Movie[] = [];

  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.fetchRecentlyReleased();
  }

  fetchRecentlyReleased() {
    const currentYear = new Date().getFullYear();
    this.loading = true;
    this.error = null;
    this.movieService.searchMovies(currentYear.toString()).subscribe({
      next: (movies) => {
        this.recentlyReleasedMovies = movies.slice(0, 9);
        this.featuredMovies = movies.slice(0, 24);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to fetch recently released movies.';
        this.loading = false;
      },
    });
  }

  onSearch(query: string) {
    if (!query.trim()) {
      return;
    }

    this.loading = true;
    this.error = null;
    this.searchResults = [];

    this.movieService.searchMovies(query).subscribe({
      next: (movies) => {
        this.searchResults = movies;
        this.loading = false;
      },
      error: (error) => {
        this.error =
          error.message || 'An error occurred while searching for movies.';
        this.loading = false;
      },
    });
  }
}

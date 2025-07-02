import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieService, Movie } from '../../services/movie.service';

@Component({
  selector: 'app-recently-released',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './recently-released.component.html',
  styleUrl: './recently-released.component.scss'
})
export class RecentlyReleasedComponent implements OnInit {
  movies: Movie[] = [];
  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.fetchRecentlyReleased();
  }

  fetchRecentlyReleased() {
    this.loading = true;
    this.error = null;
    this.movieService.searchMovies('2025').subscribe({
      next: (movies) => {
        this.movies = movies.slice(0, 12);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to fetch recently released movies.';
        this.loading = false;
      }
    });
  }
}

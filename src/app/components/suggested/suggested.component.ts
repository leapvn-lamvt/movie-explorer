import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from '../../services/movie.service';
import { getRandomKeyword } from '../../utils/randomKeyword';

@Component({
  selector: 'app-suggested',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggested.component.html',
  styleUrl: './suggested.component.scss',
})
export class SuggestedComponent implements OnInit {
  movies: Movie[] = [];

  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.fetchRecentlyReleased();
  }

  fetchRecentlyReleased() {
    const keyword = getRandomKeyword();
    this.loading = true;
    this.error = null;
    this.movieService.searchMovies(keyword).subscribe({
      next: (movies) => {
        this.movies = movies.slice(0, 5);
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to fetch recently released movies.';
        this.loading = false;
      },
    });
  }
}

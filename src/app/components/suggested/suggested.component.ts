import { Component } from '@angular/core';
import { getRandomKeyword } from '../../utils/randomKeyword';
import { Movie, MovieService } from '../../services/movie.service';
import { MovieColumnComponent } from '../movie-column/movie-column.component';

@Component({
  selector: 'app-suggested',
  standalone: true,
  imports: [MovieColumnComponent],
  templateUrl: './suggested.component.html',
  styleUrl: './suggested.component.scss',
})
export class SuggestedComponent {
  title: string = "✨ Có thể bạn sẽ thích";
  movies: Movie[] = [];

  loading = false;
  error: string | null = null;

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.fetchSuggeted();
  }

  fetchSuggeted() {
    const keyword = getRandomKeyword();
    this.loading = true;
    this.error = null;
    this.movieService.searchMovies(keyword, 1500).subscribe({
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

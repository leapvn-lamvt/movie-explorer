import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import {
  MovieDetails,
  MovieService,
  Movie,
} from '../../services/movie.service';
import { MovieInfoComponent } from '../../components/movie-info/movie-info.component';
import { MovieSliderComponent } from '../../components/movie-slider/movie-slider.component';
import { Title } from '@angular/platform-browser';
import { getRandomKeyword } from '../../utils/randomKeyword';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    FooterComponent,
    MovieInfoComponent,
    MovieSliderComponent,
  ],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieDetails | null = null;
  relevantMovies: Movie[] = [];
  loading = false;
  relevantLoading = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.titleService.setTitle('Movie Explorer - Chi tiết phim');

    this.route.paramMap.subscribe((params) => {
      const imdbID = params.get('imdbID');
      if (!imdbID) {
        this.error = 'No movie ID provided.';
        this.loading = false;
        return;
      }
      this.loading = true;
      this.movieService.getMovieById(imdbID, 750).subscribe({
        next: (movie) => {
          this.movie = movie;
          this.loading = false;
          this.fetchRelevantMovies(movie);
        },
        error: (err) => {
          this.error = err.message || 'Failed to load movie details.';
          this.loading = false;
        },
      });
    });
  }

  private fetchRelevantMovies(movie: MovieDetails) {
    this.relevantLoading = true;

    // Extract relevant keywords from movie details
    const keywords = this.extractRelevantKeywords(movie);

    const keyword = keywords.length > 0 ? keywords[Math.floor(Math.random() * keywords.length)]: getRandomKeyword();

    this.movieService
        .searchMovies({
          query: keyword,
          delayMs: 500,
        })
        .subscribe({
          next: (movies) => {
            // Filter out the current movie and limit to 12 movies
            this.relevantMovies = movies
              .filter((m) => m.imdbID !== movie.imdbID)
              .slice(0, 12);
            this.relevantLoading = false;
          },
          error: (err) => {
            console.warn('Failed to fetch relevant movies:', err);
            this.relevantLoading = false;
          },
        });
  }

  private extractRelevantKeywords(movie: MovieDetails): string[] {
    const keywords: string[] = [];

    if (movie.Genre && movie.Genre !== 'N/A') {
      const genres = movie.Genre.split(', ')
      keywords.push(...genres);
    }

    return keywords;
  }
}

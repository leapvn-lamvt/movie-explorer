import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { MovieDetails, MovieService } from '../../services/movie.service';
import { MovieInfoComponent } from '../../components/movie-info/movie-info.component';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent, MovieInfoComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieDetails | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit() {
    const imdbID = this.route.snapshot.paramMap.get('imdbID');
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
      },
      error: (err) => {
        this.error = err.message || 'Failed to load movie details.';
        this.loading = false;
      },
    });
  }
}
